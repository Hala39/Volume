import { Guid } from 'guid-typescript';
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

  constructor(private apiCaller: HttpClient, private messageService: MessageService) { }

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

    this.loadComments(postId).subscribe();

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

  loadComments(id: number, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<Comment[]>(this.baseUrl + id.toString(), {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.commentsSource.value;
            initialValue = initialValue.concat(response.body);
            this.commentsSource.next(initialValue);
        } else {
          this.commentsSource.next(response.body);
        }

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  deleteComment(id: Guid) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        if (response) {
          this.commentsSource.next(this.commentsSource.value.filter(c => c.id !== id));
        }
      })
    );
  }
      
}