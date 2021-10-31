import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'follow';

  followToggle(id: string) {
    return this.apiCaller.post(this.baseUrl + id, {});
  }

  getUserFollowing(userId: string, predicate: string) {
    let params = new HttpParams();
    params = params.append('id', userId); 
    params = params.append('predicate', predicate);
    return this.apiCaller.get(this.baseUrl, {observe: 'response', params});
  }
}
