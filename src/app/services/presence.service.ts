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

  constructor(private messageService: MessageService, private followService: FollowService,
    private chatService: ChatService,
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

  notificationsSource = new BehaviorSubject<Notification[]>([]);
  notification$ = this.notificationsSource.asObservable();

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
      detail: displayName + ' sent you a message.', sticky: true});
      this.inboxNotificationSource.next(true)
    })

    this.hubConnection.on("NewComment", ({postId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-comment', summary: 'New Comment', data: postId,
       detail: displayName + ' commented on your post', sticky: true});
       this.notificationAlertSource.next(true);
    })

    this.hubConnection.on("NewFollower", ({observerId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-follower', summary: 'New Follower', data: observerId,
       detail: displayName + ' followed you', sticky: true});
       this.notificationAlertSource.next(true);
       this.followService.stopHubConnection();
    })

    this.hubConnection.on("NewLike", ({postId, displayName}) => {
      this.messageService.add({severity: 'info', key: 'new-comment', summary: 'New Like', data: postId,
       detail: displayName + ' liked your post', sticky: true});
       this.notificationAlertSource.next(true);
       this.likeService.stopHubConnection();
    })

    this.hubConnection.on("ReceiveNotifications", (notifications: Notification[]) => {
       this.notificationsSource.next(notifications);
       if (notifications[0].seen === false) {
        this.notificationAlertSource.next(true);
       }
    })

    this.hubConnection.on("ReceiveContacts", (contacts: AppUser[]) => {
      this.chatService.contactsSource.next(contacts);
      if (contacts[0].lastMessageReceived.seen === false) {
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
