import { UserService } from './../../services/user.service';
import { UserCard } from './../../models/userCard';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/userProfile';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss']
})
export class UserAboutComponent implements OnInit {

  constructor(private profileService: ProfileService, private userService: UserService) { 
    this.profile$ = this.profileService.profile$;
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
  }

  profile$: Observable<Profile>;
  user$: Observable<UserCard>;

  displayDialog = false;
  
  hideDialog($event: any) {
    this.displayDialog = $event;
  }
}
