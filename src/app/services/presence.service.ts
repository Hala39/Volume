import { UserCard } from './../models/userCard';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AppUser } from '../models/appUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private messageService: MessageService) { }

  hubUrl = environment.hubUrl + 'presence';
  private hubConnection: HubConnection;

  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  inboxNotificationSource = new BehaviorSubject<boolean>(false);
  inbox$ = this.inboxNotificationSource.asObservable();

  createHubConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: () => localStorage.getItem("access_token")
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection 
    .start()
    .catch(error => console.log(error))

    this.hubConnection.on('UserIsOnline', id => {
      this.messageService.add({severity: 'warn', summary: id + 'is online'})
    })

    this.hubConnection.on('UserIsOffline', id => {
      this.messageService.add({severity: 'warn', summary: id + ' is offline'})
    })

    this.hubConnection.on("GetOnlineUsers", (ids: string[]) => {
      this.onlineUsersSource.next(ids);
      console.log(ids)
    })

  
    this.hubConnection.on("NewMessageReceived", ({id, displayName}) => {
      this.messageService.add({severity: 'info', key: 'c', summary: 'New message', data: id,
      detail: displayName + ' sent you a message.', sticky: true})
      this.inboxNotificationSource.next(true)
    })

  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
