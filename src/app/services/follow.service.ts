import { PaginatedResult } from './../models/paginatedResult';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { delay, finalize, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../models/appUser';
import { identifierModuleUrl } from '@angular/compiler';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'follow/';
  hubUrl = environment.hubUrl + 'follow';

  paginatedFollowers = new PaginatedResult<AppUser[]>();
  followersSource = new BehaviorSubject<AppUser[]>([]);
  followers$ = this.followersSource.asObservable();

  paginatedFollowings = new PaginatedResult<AppUser[]>();
  followingsSource = new BehaviorSubject<AppUser[]>([]);
  followings$ = this.followingsSource.asObservable();

  hubConnection: HubConnection;

  createHubConnection(targetId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '?targetId=' + targetId, {
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

  followToggle(id: string)  {
    return this.apiCaller.post<boolean>(this.baseUrl + id, {}).pipe(
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


  getUserFollowing(userId: string, predicate: string, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    params = params.append('predicate', predicate);
    return this.apiCaller.get<AppUser[]>(this.baseUrl + userId, {observe: 'response', params}).pipe(
      map(response => {
        if (predicate === 'followers')
        {
          if (scroll === true) {
            var initialValue = this.followersSource.value;
            initialValue = initialValue.concat(response.body);
            this.followersSource.next(initialValue);
          } else {
            this.followersSource.next(response.body);
          }

          if (response.headers.get("Pagination") !== null) {
            this.paginatedFollowers.pagination = JSON.parse(response.headers.get("Pagination"));
          }
        }
        
        if (predicate === 'followings') {
          if (scroll === true) {
            var initialValue = this.followingsSource.value;
            initialValue = initialValue.concat(response.body);
            this.followingsSource.next(initialValue);
          } else {
            this.followingsSource.next(response.body);
          }

          if (response.headers.get("Pagination") !== null) {
            this.paginatedFollowings.pagination = JSON.parse(response.headers.get("Pagination"));
          }
        }

        return response.body;
      })
    );
  }
}
