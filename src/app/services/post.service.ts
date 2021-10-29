import { Post } from './../models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiUrl + 'post/';

  constructor(private apiCaller: HttpClient) { }

  addPost(post: Post) {
    return this.apiCaller.post(this.baseUrl, post);
  }

  deletePost(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString());
  }

  getPosts() {
    return this.apiCaller.get<Post[]>(this.baseUrl);
  }
  
}
