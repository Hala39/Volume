import { Comment } from './../models/comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'comment/';
  paginatedResult = new PaginatedResult<Comment[]>();
  commentsSource = new BehaviorSubject<Comment[]>([]);
  comments$ = this.commentsSource.asObservable();

  addComment(postId: number, content: string) {
    return this.apiCaller.post(this.baseUrl + postId.toString() + '?content=' + content, {}).pipe(
      map(response => {
        if (response) {
          this.listComments(postId).subscribe();
        }
      })
    );
  }

  deleteComment(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        if (response) {
          this.commentsSource.next(this.commentsSource.value.filter(c => c.id !== id));
        }
      })
    );
  }

  listComments(id: number) {
    let params = new HttpParams();

    return this.apiCaller.get<Comment[]>(this.baseUrl + id.toString(), {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        this.commentsSource.next(response.body);

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    );
  } 
      
}