import { UserService } from './user.service';
import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUser } from '../models/appUser';
import { map } from 'rxjs/operators';
import { UserCard } from '../models/userCard';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private apiCaller: HttpClient, private userService: UserService) { 
    this.user$ = this.userService.user$;
  }

  baseUrl = environment.apiUrl + 'like/';

  likersSource = new BehaviorSubject<AppUser[]>([]);
  likers$ = this.likersSource.asObservable();
  
  paginatedResult = new PaginatedResult<AppUser[]>();

  user$: Observable<UserCard>;

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
