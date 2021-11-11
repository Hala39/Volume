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
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, 
    private chatService: ChatService,
    public presenceService: PresenceService,
    private searchService: SearchService,
    private notificationService: NotificationService,
    private profileService: ProfileService) {
    this.user$ = this.userService.user$;
    this.contacts$ = this.chatService.contacts$;
  }

  ngOnInit(): void {
  }

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));
  user$: Observable<UserCard>;

  contacts$: Observable<AppUser[]>;

  searchOperations$: Observable<SearchOperation[]>;

  searchResults$: Observable<AppUser[]>;

  userId = this.user.id;

  keyword: string[];

  goToProfile() {
    this.router.navigateByUrl('/profile')
  }

  search(keyword?: string) {
    if (keyword !== null && keyword?.length > 0)
    {
      var word = keyword;
    }
    else 
    {
      var word = this.keyword.join(" ");
    }
    this.profileService.getProfilesList(word).subscribe(
      response => {
        this.searchResults$ = this.profileService.searchResults$;
        this.hideRecent = true;
      }
    );
  }

  removeOneOperation(id: number) {
    this.searchService.removeOneOperation(id).subscribe();
  }

  clearAll() {
    this.searchService.clearRecentSearches().subscribe();
  }

  onShow() {
    this.searchService.getRecentSearches().subscribe(
      response => {
        this.searchOperations$ = this.searchService.searchOperations$
      }
    )
  }

  exit() {
    this.profileService.searchResultsSource.next(null);
    this.hideRecent = false;
  }

  hideRecent: boolean = false;

  navigateToMessages(id: string) {
    this.presenceService.inboxNotificationSource.next(false);
    this.router.navigateByUrl("/profile/messages/" + id);
  }
 
  navigate(notification: Notification) {
    switch (notification.stimulation) {
      case 0 || 1:
        this.router.navigateByUrl('/post/' + notification.path);
        break;
      case 2: 
        this.router.navigateByUrl('/profile/' + notification.path);
        break;

      default:
        break;
    }
  }

  onNotificationsShow() {
    
  }

  onNotificationsHide() {
    this.notificationService.markRead().subscribe(
      response => {
        this.presenceService.notificationAlertSource.next(false);
      }
    );
  }

  deleteOne(id: number) {
    this.notificationService.deleteOne(id).subscribe();
  }

  clearAllNotifications() {
    this.notificationService.clearAll("notifications").subscribe();
  }
}
