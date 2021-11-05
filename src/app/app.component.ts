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
  
  constructor(private primengConfig: PrimeNGConfig, private userService: UserService) {
    this.userService.userSource.next(JSON.parse(localStorage.getItem("userCard")));
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    window.scrollTo(0,0);
  }

}
