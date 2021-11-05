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

  photosSource = new BehaviorSubject<File[]>([]);
  photos$ = this.photosSource.asObservable();

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
    return this.apiCaller.post(this.baseUrl + 'photo', formData).pipe(
      map(response => {
        this.getProfileForUser(this.userService.userSource.value.id).subscribe(
          response => {
            var userCard = JSON.parse(localStorage.getItem("userCard"));
            userCard.profilePhotoUrl = this.profileSource.value.profilePhotoUrl;
            localStorage.setItem("userCard", JSON.stringify(userCard));
            this.userService.userSource.next(userCard);
          }
        );
        
      })
    );
  }

  setUserBio(profile: Profile) {
    return this.apiCaller.post(this.baseUrl + 'bio', profile).pipe(
      map(response => {
        var currentProfile: Profile = JSON.parse(localStorage.getItem('profile'));
        if (currentProfile) {
          profile.posts = currentProfile.posts;
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

  getPhotosForUser(id: string) {
    return this.apiCaller.get<File[]>(this.baseUrl + 'photos/' + id).pipe(
      map(response => {
        this.photosSource.next(response)
      })
    )
  }

  getSuggestedUsersList() {
    let params = new HttpParams();
    params = params.append("Suggest", true);
    params = params.append("PageSize", 5);
    return this.apiCaller.get<AppUser[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedSuggestionsResult.result = response.body; 
        this.suggestionsSource.next(response.body);

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getProfilesList(keyword: string) {
    let params = new HttpParams();
    params = params.append("Keyword", keyword);
    params = params.append("Suggest", false);
    return this.apiCaller.get<AppUser[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body; 
        this.searchResultsSource.next(response.body);
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

  
}
