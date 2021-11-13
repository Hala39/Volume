import { NotificationService } from './../../services/notification.service';
import { ChatService } from './../../services/chat.service';
import { PresenceService } from './../../services/presence.service';
import { UserService } from './../../services/user.service';
import { FollowService } from './../../services/follow.service';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/userProfile';
import { AppUser } from 'src/app/models/appUser';
import { File } from 'src/app/models/file';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private followService: FollowService, private router: Router,
    private userService: UserService, public presenceService: PresenceService, private chatService: ChatService,
    private notificationService: NotificationService,
    private activatedRoute : ActivatedRoute, private cdr: ChangeDetectorRef) {
      this.user$ = this.userService.user$;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.getProfile();

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    if (this.activatedRoute.toString().includes('messages')) {
      this.loadThread();
    }
  }

  profile$: Observable<Profile>;
  followers$: Observable<AppUser[]>;
  followings$: Observable<AppUser[]>;
  photos$: Observable<File[]>;
  user$: Observable<UserCard>;
  activities$: Observable<Notification[]>;
  contact: AppUser;

  userId = this.activatedRoute.snapshot.paramMap.get('id')? 
  this.activatedRoute.snapshot.paramMap.get('id') : this.userService.userSource.value.id;


  followToggle() {
    this.followService.followToggle(this.userId).subscribe(
      response => {
        var currentProfile = this.profileService.profileSource.value;
        currentProfile.isFollowing = !currentProfile.isFollowing;
        this.profileService.profileSource.next(currentProfile);
      }
    );
  }

  getProfile() {
    this.profileService.getProfileForUser(this.userId).subscribe(
      response => this.profile$ = this.profileService.profile$
    );
  }

  getFollowers() {
    this.followService.getUserFollowing(this.userId, 'followers').subscribe(
      response => this.followers$ = this.followService.followers$
    )
  }

  getFollowings() {
    this.followService.getUserFollowing(this.userId, 'followings').subscribe(
      response => this.followings$ = this.followService.followings$
    );
  }

  getPhotos() {
    this.profileService.getPhotosForUser(this.userId).subscribe(
      response => this.photos$ = this.profileService.photos$
    )
  }

  loadThread() {
    this.chatService.createHubConnection(this.userId);    
  }

  getActivities() {
    this.notificationService.getActivities().subscribe(
      response => this.activities$ = this.notificationService.activities$
    )
  }

  clearAllActivities() {
    this.notificationService.clearAll('activities').subscribe();
  }

  // TabView
  index = this.activatedRoute.toString().includes('messages')? 4 : 0;

  indexChanged(index: number) {
    this.index++;
    switch (index) {
      case 1:
        this.getPhotos();
        break;

      case 2:
        this.getFollowings();
        break;

      case 3:
        this.getFollowers();
        break;

      case 4:
        if (this.userService.userSource.value.id === this.userId) {
          this.getActivities();
        } else {
          this.loadThread();
        }
        
        break;

      default:
        break;
    }
  }

  stopHub($event: any) {
    this.chatService.stopHubConnection();
  }

  //Menu
  items : MenuItem[] = [
    { label: 'Sign out', icon: PrimeIcons.SIGN_OUT, command: () => {
      this.userService.logout();
    }}
  ]

  //Profile photo dialog
  displayDialog: boolean = false;

  show() {
    this.displayDialog = true;
  }

  photoUploaded($event: any) {
    this.displayDialog = false;
    this.profile$ = this.profileService.profile$;
  }

}
