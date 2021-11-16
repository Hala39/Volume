import { SearchOperation } from './../models/searchOperation';
import { SearchService } from './search.service';
import { PaginatedResult } from './../models/paginatedResult';
import { AppUser } from './../models/appUser';
import { UserService } from './user.service';
import { UserCard } from 'src/app/models/userCard';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { File } from '../models/file';
import { Profile } from '../models/userProfile';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiCaller: HttpClient, private userService: UserService, 
    private searchService: SearchService) { 

  }

  baseUrl = environment.apiUrl + 'profile/';


  profileSource = new BehaviorSubject<Profile>(null);
  profile$ = this.profileSource.asObservable();

  paginatedPhotos = new PaginatedResult<File[]>();
  photosSource = new BehaviorSubject<File[]>([]);
  photos$ = this.photosSource.asObservable();

  paginatedPosts = new PaginatedResult<Post[]>();
  postsSource = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSource.asObservable();

  searchResultsSource = new BehaviorSubject<AppUser[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();
  paginatedResult = new PaginatedResult<AppUser[]>();

  suggestionsSource = new BehaviorSubject<AppUser[]>([]);
  suggestions$ = this.suggestionsSource.asObservable();
  paginatedSuggestionsResult = new PaginatedResult<AppUser[]>();

  setProfilePhoto(setProfile: any) {
    var formData: any = new FormData();
    if (setProfile.file !== undefined) {
      formData.append("File", setProfile.file);
    }
    if (setProfile.url !== undefined) {
      formData.append("Url", setProfile.url);
    }
    return this.apiCaller.post<any>(this.baseUrl + 'photo', formData).pipe(
      map(response => {
        var userCard = JSON.parse(localStorage.getItem("userCard"));
        userCard.profilePhotoUrl = response.url;
        this.userService.userSource.next(userCard);
        localStorage.setItem("userCard", JSON.stringify(userCard));
        
        var currentProfileValue = this.profileSource.value;
        currentProfileValue.profilePhotoUrl = response.url;
        this.profileSource.next(currentProfileValue);

        var currentPostsSource = this.postsSource.value;
        currentPostsSource.forEach(element => {
           element.appUser.profilePhotoUrl = response.url;
        })
        this.postsSource.next(currentPostsSource);
        
      })
    );
  }

  setUserBio(profile: Profile) {
    return this.apiCaller.post(this.baseUrl + 'bio', profile).pipe(
      map(response => {
        var currentProfile: Profile = JSON.parse(localStorage.getItem('profile'));
        if (currentProfile) {
          profile.profilePhotoUrl = currentProfile.profilePhotoUrl;
        }
        this.profileSource.next(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
      })
    )
  }

  getProfileForUser(id: string) {
    return this.apiCaller.get<Profile>(this.baseUrl + id).pipe(
      map(response => {
        var currentUser = JSON.parse(localStorage.getItem('userCard'));
        this.profileSource.next(response);
        if (id === currentUser.id) {
          localStorage.setItem('profile', JSON.stringify(response));
          var userCard = JSON.parse(localStorage.getItem("userCard"));
          userCard.profilePhotoUrl = response.profilePhotoUrl;
          localStorage.setItem('userCard', JSON.stringify(userCard));
          this.userService.userSource.next(userCard);
        }
      })
    );
  }

  getPhotosForUser(id: string, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<File[]>(this.baseUrl + 'photos/' + id, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.photosSource.value;
            initialValue = initialValue.concat(response.body);
            this.photosSource.next(initialValue);
        } else {
          this.photosSource.next(response.body)
        }
        if (response.headers.get("Pagination") !== null) {
          this.paginatedPhotos = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getPostsForUser(id: string, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<Post[]>(this.baseUrl + 'posts/' + id, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.postsSource.value;
            initialValue = initialValue.concat(response.body);
            this.postsSource.next(initialValue);
        } else {
          this.postsSource.next(response.body)
        }
        if (response.headers.get("Pagination") !== null) {
          this.paginatedPosts = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getSuggestedUsersList(pageSize: number, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    params = params.append("Suggest", true);
    params = params.append("PageSize", pageSize);
    return this.apiCaller.get<AppUser[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.suggestionsSource.value;
            initialValue = initialValue.concat(response.body);
            this.suggestionsSource.next(initialValue);
        } else {
          this.suggestionsSource.next(response.body);
        }

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getProfilesList(keyword: string, pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    params = params.append("Keyword", keyword);
    params = params.append("Suggest", false);
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<AppUser[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.searchResultsSource.value;
            initialValue = initialValue.concat(response.body);
            this.searchResultsSource.next(initialValue);
        } else { 
          this.searchResultsSource.next(response.body)
        }


        const searchOperation : SearchOperation = {
          keyword: keyword,
          date: new Date
        };
        this.searchService.addSearchOperation(searchOperation).subscribe();
    
        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getAppUser(id: string) {
    return this.apiCaller.get<AppUser>(this.baseUrl + 'appUser/' + id);
  }
}
