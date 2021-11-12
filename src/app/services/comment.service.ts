import { UserService } from './user.service';
import { MessageService } from 'primeng/api';
import { Comment } from './../models/comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiCaller: HttpClient, private messageService: MessageService, private userService: UserService) { }

  baseUrl = environment.apiUrl + 'comment/';
  paginatedResult = new PaginatedResult<Comment[]>();
  commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  async addComment(postId: number, content: string) {
    this.hubConnection.invoke("AddComment", {PostId: postId, content})
    .catch(error => console.log(error))
  }

  createHubConnection(postId: number) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'comment?postId=' + postId, {
        accessTokenFactory: () => localStorage.getItem("access_token")
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .catch(error => console.log(error));
      // .finally(() => this.busyService.idle());

    this.hubConnection.on('LoadComments', comments => {
      this.commentsSource.next(comments);
    })

    this.hubConnection.on('ReceiveComment', comment => {
      var currentValue = this.commentsSource.value;
      currentValue.unshift(comment);
      this.commentsSource.next(currentValue);
    })

  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.commentsSource.next([]);
      this.hubConnection.stop();
    }
  }

  deleteComment(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        if (response) {
          this.commentsSource.next(this.commentsSource.value.filter(c => c.id !== id));
        }
      })
    );
  }
      
}