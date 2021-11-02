import { Post } from 'src/app/models/post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../models/paginatedResult';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl + 'post/';

  paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();

  postsSource = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSource.asObservable();

  constructor(private apiCaller: HttpClient) { }

  addPost(post: any) {
    var formData: any = new FormData();
    formData.append("Description", post.description);
    formData.append("File", post.fileToUpload);
    formData.append("IsPhoto", post.isPhoto);
    return this.apiCaller.post(this.baseUrl, formData).pipe(
      map(response => {
        if (response) {
          this.getPosts();
        }
      })
    );
  }

  deletePost(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString());
  }

  getPosts() {
  let params = new HttpParams();

    return this.apiCaller.get<Post[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        this.postsSource.next(response.body);
        
        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  
}
