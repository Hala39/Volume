import { MiniUser } from './../models/miniUser';
import { UserCard } from 'src/app/models/userCard';
import { HttpClient } from '@angular/common/http';
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

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'profile/';

  currentUser: UserCard = JSON.parse(localStorage.getItem('userCard'));

  profileSource = new BehaviorSubject<Profile>(null);
  profile$ = this.profileSource.asObservable();

  photosSource = new BehaviorSubject<File[]>([]);
  photos$ = this.photosSource.asObservable();

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
        this.getProfileForUser(this.currentUser.id).subscribe();
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
        this.profileSource.next(response);
        localStorage.setItem('profile', JSON.stringify(response));
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
