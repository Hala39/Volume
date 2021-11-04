import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router, private messageService: MessageService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //check some condition  
      if (this.userService.loggedIn === false)  {
        this.messageService.add({severity: 'warn', summary: 'Unauthorized', detail: 'Please login first!'});
        this.router.navigateByUrl("/");
        return false;
    } 
    return true;
  }
}
