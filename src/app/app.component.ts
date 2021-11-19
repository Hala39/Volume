import { NotificationService } from './services/notification.service';
import { PresenceService } from './services/presence.service';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { Message, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Volume';
  
  constructor(private primengConfig: PrimeNGConfig, private userService: UserService, 
    private router: Router,
    private presenceService: PresenceService) {
    this.userService.userSource.next(JSON.parse(localStorage.getItem("userCard")));
    if (this.userService.loggedIn && !this.userService.isExpired) {
      this.presenceService.createHubConnection();
    }
  }

  ngOnInit() {
    window.scrollTo(0,0);
    this.primengConfig.ripple = true;
  }

  navigateToMessage(id: string) {
    this.router.navigateByUrl("/profile/messages/" + id);
  }

  navigateToPost(data: any) {
    this.router.navigateByUrl("/post/" + data.postId);
  }

  navigateToProfile(data: any) {
    this.router.navigateByUrl("/profile/" + data.observerId);
  }
}
