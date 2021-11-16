import { ChatService } from './chat.service';
import { FollowService } from './follow.service';
import { LikeService } from './like.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppUser } from '../models/appUser';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private messageService: MessageService, 
    private followService: FollowService,
    private likeService: LikeService) { }

  baseUrl = environment.apiUrl + 'notification/';  
  hubUrl = environment.hubUrl + 'presence';
  private hubConnection: HubConnection;

  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  inboxNotificationSource = new BehaviorSubject<boolean>(false);
  inbox$ = this.inboxNotificationSource.asObservable();

  notificationAlertSource = new BehaviorSubject<boolean>(false);
  alert$ = this.notificationAlertSource.asObservable();

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
      var currentValue = this.onlineUsersSource.value;
      currentValue.push(id);
      this.onlineUsersSource.next(currentValue);
    })

    this.hubConnection.on('UserIsOffline', id => {
      var currentValue = this.onlineUsersSource.value;
      currentValue = currentValue.filter(x => x !== id);
      this.onlineUsersSource.next(currentValue);
    })

    this.hubConnection.on("GetOnlineUsers", (ids: string[]) => {
      this.onlineUsersSource.next(ids);
    })

    this.hubConnection.on("NewMessageReceived", ({id, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-message', summary: 'New message', data: id,
      detail: displayName + ' has sent you a message.'});
      this.inboxNotificationSource.next(true)
    })

    this.hubConnection.on("NewComment", ({postId, displayName, notificationId}) => {
      this.messageService.add({key: 'new-comment', summary: 'New Comment', data: {postId, notificationId},
       detail: displayName + ' has commented on your post'});
       this.notificationAlertSource.next(true);
    })

    this.hubConnection.on("NewFollower", ({observerId, displayName, notificationId}) => {
      this.messageService.add({key: 'new-follower', summary: 'New Follower', data: {observerId, notificationId},
       detail: displayName + ' has followed you'});
       this.notificationAlertSource.next(true);
       this.followService.stopHubConnection();
    })

    this.hubConnection.on("NewLike", ({postId, displayName, notificationId}) => {
      this.messageService.add({key: 'new-comment', summary: 'New Like', data: {postId, notificationId},
       detail: displayName + ' has liked your post'});
       this.notificationAlertSource.next(true);
       this.likeService.stopHubConnection();
    })

    this.hubConnection.on("CheckNotifications", bool => {
      if (bool) {
       this.notificationAlertSource.next(true);
      }
    })

    this.hubConnection.on("CheckMessages", bool => {
      if (bool) {
        this.inboxNotificationSource.next(true);
      }
   })

  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

}
