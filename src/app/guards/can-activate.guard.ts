import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
 
 
@Injectable()
export class CanActivateGuard implements CanActivate {
 
    constructor(private router:Router, private userService: UserService, private messageService: MessageService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (this.userService.loggedIn === false)  {
            this.messageService.add({severity: 'warn', summary: 'Unauthorized', detail: 'Please login first!'});
            this.router.navigateByUrl("/");
            return false;
        } 
        return true;
    }
 
}