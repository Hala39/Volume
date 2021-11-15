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
import { SavedPost } from '../models/savedPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));

  constructor(private apiCaller: HttpClient, private profileService: ProfileService, 
    private messageService: MessageService) { }

    baseUrl = environment.apiUrl + 'post/';

  paginatedResult = new PaginatedResult<Post[]>();
  postsSource = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSource.asObservable();

  paginatedSaved = new PaginatedResult<SavedPost[]>();
  savedSource = new BehaviorSubject<SavedPost[]>([]);
  saved$ = this.savedSource.asObservable();
  
  addPost(post: any) {
    var formData: any = new FormData();
    formData.append("Description", post.description);
    formData.append("File", post.fileToUpload);
    formData.append("IsPhoto", post.isPhoto);
    return this.apiCaller.post(this.baseUrl, formData).pipe(
      map(response => {
        if (response) {
          this.profileService.getPostsForUser(this.currentUser.id).subscribe()
        }
      })
    );
  }

  deletePost(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        var value = this.profileService.postsSource.value;
        value = value.filter(p => p.id !== id);
        this.profileService.postsSource.next(value);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Post deleted successfully!'})
      })
    );
  }


  getPosts(pageNumber: number, scroll: boolean) {
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber.toString())
    return this.apiCaller.get<Post[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
          if (scroll === true)
          {
            var initialValue = this.postsSource.value;
            initialValue = initialValue.concat(response.body);
            this.postsSource.next(initialValue);
          }
          else 
          {
            this.postsSource.next(response.body);
          }
        
        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getSavedPosts(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber)
    {
      params = params.append("pageNumber", pageNumber.toString())
    }
    return this.apiCaller.get<SavedPost[]>(this.baseUrl + 'saved', {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
          {
            var initialValue = this.savedSource.value;
            initialValue = initialValue.concat(response.body);
            this.savedSource.next(initialValue);
          }
          else 
          {
            this.savedSource.next(response.body);
          }
        
        if (response.headers.get("Pagination") !== null) {
          this.paginatedSaved.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  savePostToggle(id: number) {
    return this.apiCaller.post<boolean>(this.baseUrl + 'save/' + id.toString(), {});
  }

  updatePost(id: number, description: string) {
    return this.apiCaller.put(this.baseUrl + id.toString() +'?description=' + description, {});
  }
  
  getPostDetails(id: number) {
    return this.apiCaller.get<Post>(this.baseUrl + id.toString());
  }
}
