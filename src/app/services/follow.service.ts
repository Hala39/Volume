import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../models/appUser';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'follow/';

  followersSource = new BehaviorSubject<AppUser[]>([]);
  followers$ = this.followersSource.asObservable();

  followingsSource = new BehaviorSubject<AppUser[]>([]);
  followings$ = this.followingsSource.asObservable();

  followToggle(id: string) {
    return this.apiCaller.post(this.baseUrl + id.toString(), {});
  }

  getUserFollowing(userId: string, predicate: string) {
    let params = new HttpParams();
    params = params.append('predicate', predicate);
    return this.apiCaller.get<AppUser[]>(this.baseUrl + userId, {observe: 'response', params}).pipe(
      map(response => {
        if (predicate === 'followers') {
          this.followersSource.next(response.body);
        } else if (predicate === 'followings') {
          this.followingsSource.next(response.body);
        }

        return response.body;
      })
    );
  }
}
