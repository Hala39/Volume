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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiCaller: HttpClient, private jwtHelper: JwtHelperService, 
    private presenceService: PresenceService,
    private router: Router) { }
    
  baseUrl = environment.apiUrl + 'account/';

  userSource = new BehaviorSubject<UserCard>(null);
  user$ = this.userSource.asObservable();

  login(userLogin: UserLogin) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'login', userLogin).pipe(
      map(response => {
        if (response) {
          this.setUserCard(response);
          this.router.navigateByUrl("/home");
          this.presenceService.createHubConnection(response);
        }
      })
    )
  }

  signup(userRegister: UserRegister) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'register', userRegister).pipe(
      map(response => {
        if (response) {
          this.setUserCard(response);
          this.presenceService.createHubConnection(response);
        } 
      })
    );
  }

  setUserCard(userCard: UserCard) {
    localStorage.clear();
    this.userSource.next(userCard);
    localStorage.setItem('userCard', JSON.stringify(userCard));
    localStorage.setItem('access_token', userCard.token);
    localStorage.setItem('expirationDate', 
    JSON.stringify(this.jwtHelper.getTokenExpirationDate(userCard.token)));
  }


  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/");
    this.presenceService.stopHubConnection();
  }
  
  getExpiration() {
    return localStorage.getItem("expirationDate");
  } 

  refreshPage() {
    var currentRoute: string = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(()=>this.router.navigateByUrl(currentRoute));
  }

}
