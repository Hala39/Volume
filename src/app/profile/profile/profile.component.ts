import { take } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { NotificationService } from './../../services/notification.service';
import { ChatService } from './../../services/chat.service';
import { PresenceService } from './../../services/presence.service';
import { UserService } from './../../services/user.service';
import { FollowService } from './../../services/follow.service';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/userProfile';
import { AppUser } from 'src/app/models/appUser';
import { File } from 'src/app/models/file';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Notification } from '../../models/notification';
import { Post } from 'src/app/models/post';
import { SavedPost } from 'src/app/models/savedPost';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private followService: FollowService, private router: Router,
    private userService: UserService, public presenceService: PresenceService,
    private notificationService: NotificationService, private postService: PostService,
    public activatedRoute : ActivatedRoute, private cdr: ChangeDetectorRef) {
      this.user$ = this.userService.user$;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.getProfile();
    this.getPosts();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  profile$: Observable<Profile>;
  followers$: Observable<AppUser[]>;
  followings$: Observable<AppUser[]>;
  photos$: Observable<File[]>;
  posts$: Observable<Post[]>;
  user$: Observable<UserCard>;
  activities$: Observable<Notification[]>;
  saved$: Observable<SavedPost[]>;
  contact: AppUser;

  userId = this.activatedRoute.snapshot.paramMap.get('id')? 
  this.activatedRoute.snapshot.paramMap.get('id') : this.userService.userSource.value.id;


  chattingMode = false;

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


  getPosts() {
    this.profileService.getPostsForUser(this.userId).subscribe(
      response => this.posts$ = this.profileService.posts$
    )
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

  getActivities() {
    this.notificationService.getActivities().subscribe(
      response => this.activities$ = this.notificationService.activities$
    )
  }

  clearAllActivities() {
    this.notificationService.clearAll('activities').subscribe();
  }

  getSavedPosts() {
    this.postService.getSavedPosts().subscribe(
      response => this.saved$ = this.postService.saved$
    );
  }

  // TabView
  index = 0;

  indexChanged(index: number) {
    if (index !== 4) {
      this.chattingMode = false;
    }
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
          this.getSavedPosts();
        break;  

      case 5:
        this.getActivities();
        break;

      default:
        break;
    }
  }

  //Menu
  items : MenuItem[] = [
    { label: 'Sign out', icon: PrimeIcons.SIGN_OUT, command: () => {
      this.userService.logout();
    }}
  ]

  followMenuItems : MenuItem[] = [
    {command: () => {
      this.followToggle();
    }}]

  isFollowing() {
    if (this.profileService.profileSource?.value?.isFollowing) {
      this.followMenuItems[0].label = 'UnFollow';
    }
    else {
      this.followMenuItems[0].label = 'Follow';
    }
  }
  
  //Profile photo dialog
  displayDialog: boolean = false;

  show() {
    this.displayDialog = true;
  }

  photoUploaded($event: any) {
    this.displayDialog = false;
    this.profile$ = this.profileService.profile$;
  }


  //Pagination
  pageNumber = 2;

  noMorePhotos = false;
  onPhotosLoad() {
    this.profileService.getPhotosForUser(this.userId, this.pageNumber++, true).subscribe(
      response => {
        var pagination = this.profileService.paginatedPhotos.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMorePhotos = true;
        }
      }
    )
  }

  noMoreActivities = false;
  onActivitiesLoad() {
    this.notificationService.getActivities(this.pageNumber++, true).subscribe(
      response => {
        var pagination = this.notificationService.paginatedActivitiesResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMoreActivities = true;
        }
      }
    );
  }

  noMoreFollowers = false;
  onFollowersLoad() {
    this.followService.getUserFollowing(this.userId, 'followers', this.pageNumber++, true).subscribe(
      response => {
        this.followers$ = this.followService.followers$;
        var pagination = this.followService.paginatedFollowers.pagination;
        if (pagination.currentPage === pagination.totalPages) {
            this.noMoreFollowings = true;
          }
      }
    )
  }

  noMoreFollowings = false;
  onFollowingsLoad() {
    this.followService.getUserFollowing(this.userId, 'followings', this.pageNumber++, true).subscribe(
      response => {
        this.followings$ = this.followService.followings$;
        var pagination = this.followService.paginatedFollowings.pagination;
        if (pagination.currentPage === pagination.totalPages) {
            this.noMoreFollowings = true;
          }
      }
    )
  }

  onScroll(e: any) {
    this.profileService.getPostsForUser(this.userId, this.pageNumber++, true).subscribe();
  }
}
