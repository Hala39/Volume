import { UserCard } from './../models/userCard';
import { environment } from './../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppUser } from '../models/appUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private apiCaller: HttpClient, private jwtHelper: JwtHelperService, 
    private router: Router, private messageService: MessageService,
    private location: Location) { }

  logIn(appUser: AppUser) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'login', appUser).pipe(
      map(response => {
        if (response) {
          this.setUserToken(response.token);
        }
      })
    )
  }

  signUp(appUser: AppUser) {
    return this.apiCaller.post<UserCard>(this.baseUrl + 'register', appUser).pipe(
      map(response => {
        if (response) {
          this.setUserToken(response.token);
        } 
      })
    );
  }

  setUserToken(token: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expirationDate', JSON.stringify(this.jwtHelper.getTokenExpirationDate(token)));
    this.refreshPage();

  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  logout() {
    localStorage.clear();
    this.refreshPage();
    window.location.reload();
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
