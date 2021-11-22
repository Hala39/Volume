import { FbLogin } from './../models/fbLogin';
import { LikeService } from './like.service';
import { PresenceService } from './presence.service';
import { UserRegister } from './../models/userRegister';
import { UserCard } from './../models/userCard';
import { environment } from './../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/appUser';
import { map } from 'rxjs/operators';
import { UserLogin } from '../models/userLogin';
import { BehaviorSubject } from 'rxjs';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiCaller: HttpClient, private jwtHelper: JwtHelperService,
    private presenceService: PresenceService, private authService: SocialAuthService,
    private router: Router) { }

  baseUrl = environment.apiUrl + 'account/';

  userSource = new BehaviorSubject<UserCard>(null);
  user$ = this.userSource.asObservable();

  refreshTokenTimeout: any;

  login(userLogin: UserLogin) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'login', userLogin).pipe(
      map(response => {
        if (response) {
          this.setUserCard(response);
          this.startRefreshTokenTimer(response);
          this.router.navigateByUrl("/home");
          this.presenceService.createHubConnection();
        }
      })
    )
  }

  signup(userRegister: UserRegister) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'register', userRegister);
  }

  socialLogin(fbLogin: FbLogin) {
    return this.apiCaller?.post<UserCard>(this.baseUrl + `fbLogin`, fbLogin).pipe(
      map(response => {
        if (response) {
          this.setUserCard(response);
          this.router.navigateByUrl("/home");
          this.startRefreshTokenTimer(response);
          this.presenceService.createHubConnection();
        }
      })
    );
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((response: SocialUser) => {
        if (response) {
          const fbLogin: FbLogin = {
            name: response.name,
            email: response.email,
            authToken: response.authToken,
            photoUrl: response.photoUrl
          }
          if (fbLogin) {
            this.socialLogin(fbLogin).subscribe();
          }  
        }
      }
    )
  }

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response: SocialUser) => {
        if (response) {
          const fbLogin: FbLogin = {
            name: response.name,
            email: response.email,
            authToken: response.authToken,
            photoUrl: response.photoUrl
          }
          if (fbLogin) {
            this.socialLogin(fbLogin).subscribe();
          }  
        }
    });
  }

  refreshToken() {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'refreshToken', {}).pipe(
      map(response => {
        this.setUserCard(response);
        this.startRefreshTokenTimer(response);
        this.presenceService.createHubConnection();
      })
    )
  }

  setUserCard(userCard: UserCard) {
    localStorage.clear();
    this.userSource.next(userCard);
    localStorage.setItem('userCard', JSON.stringify(userCard));
    localStorage.setItem('access_token', userCard.token);
  }


  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  verifyEmail(token: string, email: string) {
    return this.apiCaller.post<UserCard>(this.baseUrl + `verifyEmail?token=${token}&email=${email}`, {}).pipe(
      map(response => {
        if (response) {
          this.setUserCard(response);
          this.startRefreshTokenTimer(response);
          this.presenceService.createHubConnection();
        }
      })
    );      
  }

  resendEmailConfirmation(email: string) {
    return this.apiCaller.get(this.baseUrl + `resendEmailConfirmation?email=${email}`);
  }

  logout() {
    localStorage.clear();
    this.authService.signOut();
    this.router.navigateByUrl("/");
    this.presenceService.stopHubConnection();
  }

  public get isExpired() : boolean {
    const token = localStorage.getItem("access_token");
    const expiration = this.jwtHelper.getTokenExpirationDate(token);

    if (expiration.getTime() < Date.now()) {
      return true;
    }

    return false;

  }

  private startRefreshTokenTimer(user: UserCard) {
    this.stopRefreshTokenTimer();
    const expires = this.jwtHelper.getTokenExpirationDate(user.token);
    const timeout = expires.getTime() - Date.now() - (120 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
