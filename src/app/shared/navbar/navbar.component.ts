import { NotificationService } from './../../services/notification.service';
import { ChatService } from 'src/app/services/chat.service';
import { PresenceService } from './../../services/presence.service';
import { SearchService } from './../../services/search.service';
import { SearchOperation } from './../../models/searchOperation';
import { ProfileService } from 'src/app/services/profile.service';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { UserCard } from './../../models/userCard';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';
import { Notification } from 'src/app/models/notification';

export enum phrases {
  ' has liked your post.',
  ' has commented on your post.',
  ' has followed you.'
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, 
    public presenceService: PresenceService) {
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
  }

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));
  user$: Observable<UserCard>;

  userId = this.user.id;


}
