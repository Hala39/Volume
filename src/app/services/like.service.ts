import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUser } from '../models/appUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'like/';

  likersSource = new BehaviorSubject<AppUser[]>([]);
  likers$ = this.likersSource.asObservable();
  
  paginatedResult = new PaginatedResult<AppUser[]>();

  likeToggle(id: number) {
    return this.apiCaller.post(this.baseUrl + id.toString(), {});
  }

  getLikes(id: number) {
    let params = new HttpParams();
    return this.apiCaller.get<AppUser[]>(this.baseUrl + id.toString() , {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        this.likersSource.next(response.body);

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    );
  }
}
