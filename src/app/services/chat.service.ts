import { ProfileService } from 'src/app/services/profile.service';
import { Message } from './../models/message';
import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser';
import { map, take } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserCard } from '../models/userCard';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apiCaller: HttpClient, private userService: UserService,
    private profileService: ProfileService,
    private messageService: MessageService) { }

  baseUrl = environment.apiUrl + 'message/';
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  threadSource = new BehaviorSubject<Message[]>([]);
  thread$ = this.threadSource.asObservable();
  paginatedThreadResult = new PaginatedResult<Message[]>();

  async addMessage(recipientId: string, content: string, file: File, isPhoto: any) {
    this.hubConnection.invoke("SendMessage", {RecipientId: recipientId, content})
    .catch(error => console.log(error))
  }

  deleteMessage(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        var currentThreadValue = this.threadSource.value;    
        currentThreadValue = currentThreadValue.filter(m => m.id !== id);
        this.threadSource.next(currentThreadValue);
      })
    );
  }

  createHubConnection(otherUsername: string) {

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => localStorage.getItem("access_token")
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .catch(error => console.log(error));
      // .finally(() => this.busyService.idle());

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.threadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.thread$.pipe(take(1)).subscribe(messages => {
        this.threadSource.next([...messages, message])
      })
    })

    // this.hubConnection.on('UpdatedGroup', (group: Group) => {
    //   if (group.connections.some(x => x.username === otherUsername)) {
    //     this.messageThread$.pipe(take(1)).subscribe(messages => {
    //       messages.forEach(message => {
    //         if (!message.dateRead) {
    //           message.dateRead = new Date(Date.now())
    //         }
    //       })
    //       this.messageThreadSource.next([...messages]);
    //     })
    //   }
    // })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.threadSource.next([]);
      this.hubConnection.stop();
    }
  }


}
