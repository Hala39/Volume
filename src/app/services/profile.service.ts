import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { File } from '../models/file';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'profile/';

  profileSource = new BehaviorSubject<Profile>(null);
  profile$ = this.profileSource.asObservable();

  photosSource = new BehaviorSubject<File[]>([]);
  photos$ = this.photosSource.asObservable();

  createOrUpdateProfile(profile: Profile) {
    return this.apiCaller.post(this.baseUrl, profile).pipe(
      map(response => {
       
      })
    )
  }

  getProfileForUser(id: string) {
    return this.apiCaller.get<Profile>(this.baseUrl + id).pipe(
      map(response => {
        this.profileSource.next(response);
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
}
