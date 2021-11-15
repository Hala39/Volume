import { PresenceService } from './presence.service';
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
import { Group } from '../models/group';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'message/';
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  threadSource = new BehaviorSubject<Message[]>([]);
  thread$ = this.threadSource.asObservable();
  paginatedThreadResult = new PaginatedResult<Message[]>();

  contactsSource = new BehaviorSubject<AppUser[]>([]);
  contacts$ = this.contactsSource.asObservable();

  groupSource = new BehaviorSubject<Group>(null);

  createHubConnection(contactId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?contactId=' + contactId, {
        accessTokenFactory: () => localStorage.getItem("access_token")
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection.start()
      .catch(error => console.log(error));

    this.getMessageThread(contactId).subscribe(
      res => console.log(res)
    );
      // .finally(() => this.busyService.idle());

    this.hubConnection.on('NewMessage', message => {
      this.thread$.pipe(take(1)).subscribe(messages => {
        this.threadSource.next([...messages, message])
      })
    })

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.userId === contactId)) {
        this.threadSource.value.forEach(message => {
           if (message.seen === false) {
             message.seen = true
           } 
        });
      }
      
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.threadSource.next([]);
      this.hubConnection.stop();
    }
  }

  async addMessage(recipientId: string, content: string) {
    this.hubConnection.invoke("SendMessage", {RecipientId: recipientId, content})
    .catch(error => console.log(error))
  }

  deleteMessage(id: Guid) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        var currentThreadValue = this.threadSource.value;
        currentThreadValue = currentThreadValue.filter(m => m.id !== id);
        this.threadSource.next(currentThreadValue);
      })
    );
  }

  paginatedResult = new PaginatedResult<AppUser[]>();

  getContacts(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<AppUser[]>(this.baseUrl + 'contact', {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
          {
            var initialValue = this.contactsSource.value;
            initialValue = initialValue.concat(response.body);
            this.contactsSource.next(initialValue);
          }
          else 
          {
            this.contactsSource.next(response.body);
          }
          
          this.paginatedResult.result = response.body;
        
        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  readOne(guid: Guid) {
    return this.apiCaller.post(this.baseUrl + 'read/' + guid.toString(), {}).pipe(
      map(response => {
        var currentValue = this.threadSource.value;
        var messageIndex = currentValue.findIndex(m => m.guid === guid);
        currentValue[messageIndex].seen = true;
        this.threadSource.next(currentValue);
      })
    )
  }

  getMessageThread(contactId: string, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<Message[]>(this.baseUrl + contactId.toString(), {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
          {
            var initialValue = this.threadSource.value;
            initialValue = response.body.reverse().concat(initialValue.concat());
            this.threadSource.next(initialValue);
          }
          else 
          {
            this.threadSource.next(response.body.reverse());
          }
          
        if (response.headers.get("Pagination") !== null) {
          this.paginatedThreadResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

}
