import { PresenceService } from './services/presence.service';
import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Volume';
  
  constructor(private primengConfig: PrimeNGConfig, private userService: UserService, private presenceService: PresenceService) {
    this.userService.userSource.next(JSON.parse(localStorage.getItem("userCard")));
    if (this.userService.loggedIn) {
      this.presenceService.createHubConnection(this.userService.userSource.value)
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    window.scrollTo(0,0);
  }

}
