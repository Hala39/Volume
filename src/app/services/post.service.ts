import { MessageService } from 'primeng/api';
import { UserCard } from './../models/userCard';
import { ProfileService } from 'src/app/services/profile.service';
import { Post } from 'src/app/models/post';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../models/paginatedResult';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));

  constructor(private apiCaller: HttpClient, private profileService: ProfileService, 
    private messageService: MessageService) { }

    baseUrl = environment.apiUrl + 'post/';

  paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();

  postsSource = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSource.asObservable();
  
  addPost(post: any) {
    var formData: any = new FormData();
    formData.append("Description", post.description);
    formData.append("File", post.fileToUpload);
    formData.append("IsPhoto", post.isPhoto);
    return this.apiCaller.post(this.baseUrl, formData).pipe(
      map(response => {
        if (response) {
          this.profileService.getProfileForUser(this.currentUser.id).subscribe()
        }
      })
    );
  }

  deletePost(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        const value = this.profileService.profileSource.value;
        value.posts = value.posts.filter(p => p.id !== id);
        this.profileService.profileSource.next(value);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Post deleted successfully!'})
      })
    );
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

  updatePost(id: number, description: string) {
    return this.apiCaller.put(this.baseUrl + id.toString() +'?description=' + description, {});
  }
  
}
