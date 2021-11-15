import { MessageService } from 'primeng/api';
import { PresenceService } from './presence.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { UserService } from './user.service';
import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUser } from '../models/appUser';
import { finalize, map } from 'rxjs/operators';
import { UserCard } from '../models/userCard';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private apiCaller: HttpClient) { 
    
  }

  baseUrl = environment.apiUrl + 'like/';
  hubUrl = environment.hubUrl + 'like';

  likersSource = new BehaviorSubject<AppUser[]>([]);
  likers$ = this.likersSource.asObservable();
  
  paginatedResult = new PaginatedResult<AppUser[]>();

  hubConnection: HubConnection;

  createHubConnection(postId: number) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '?postId=' + postId, {
        accessTokenFactory: () => localStorage.getItem("access_token")
      })
      .withAutomaticReconnect()
      .build()

    this.hubConnection 
    .start()
    .catch(error => console.log(error))

  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  likeToggle(id: number)  {
    return this.apiCaller.post<boolean>(this.baseUrl + id.toString(), {}).pipe(
      map(response => {
        if (response) {
          this.createHubConnection(id);
        }
      },
      finalize(() => {
        this.stopHubConnection();
      })
    )
    );
  }

  getLikes(id: number, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<AppUser[]>(this.baseUrl + id.toString() , {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
        {
          var initialValue = this.likersSource.value;
          initialValue = initialValue.concat(response.body);
          this.likersSource.next(initialValue);
        }
        else 
        {
          this.likersSource.next(response.body);
        }        

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    );
  }
}
