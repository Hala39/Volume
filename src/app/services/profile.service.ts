import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'profile/';

  createOrUpdateProfile(profile: Profile) {
    return this.apiCaller.post(this.baseUrl, profile).pipe(
      map(response => {
        localStorage.setItem('profile', JSON.stringify(profile));
      })
    )
  }

  getProfileForUser(id: string) {
    return this.apiCaller.get(this.baseUrl + id).pipe(
      map(response => {
        localStorage.setItem('profile', JSON.stringify(response));
      })
    );
  }
}
