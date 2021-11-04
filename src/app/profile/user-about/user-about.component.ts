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

  constructor(private profileService: ProfileService) { 
    this.profile$ = this.profileService.profile$;
  }

  ngOnInit(): void {
  }

  profile$ : Observable<Profile>;

  displayDialog = false;

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));
  
  hideDialog($event: any) {
    this.displayDialog = $event;
  }
}
