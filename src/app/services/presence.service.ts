import { FollowService } from './follow.service';
import { LikeService } from './like.service';
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

  constructor(private messageService: MessageService, private followService: FollowService,
    private likeService: LikeService) { }

  hubUrl = environment.hubUrl + 'presence';
  private hubConnection: HubConnection;

  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  inboxNotificationSource = new BehaviorSubject<boolean>(false);
  inbox$ = this.inboxNotificationSource.asObservable();

  notificationSource = new BehaviorSubject<boolean>(false);
  notification$ = this.notificationSource.asObservable();

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
      this.messageService.add({severity: 'info', key: 'new-message', summary: 'New message', data: id,
      detail: displayName + ' sent you a message.', sticky: true});
      this.inboxNotificationSource.next(true)
    })

    this.hubConnection.on("NewComment", ({postId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-comment', summary: 'New Comment', data: postId,
       detail: displayName + ' commented on your post', sticky: true});
       this.notificationSource.next(true)
    })

    this.hubConnection.on("NewFollower", ({observerId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-follower', summary: 'New Follower', data: observerId,
       detail: displayName + ' followed you', sticky: true});
       this.notificationSource.next(true);
       this.followService.stopHubConnection();
    })

    this.hubConnection.on("NewLike", ({postId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-comment', summary: 'New Like', data: postId,
       detail: displayName + ' liked your post', sticky: true});
       this.notificationSource.next(true);
       this.likeService.stopHubConnection();
    })

  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
