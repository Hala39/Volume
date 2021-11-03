import { FollowService } from './../../services/follow.service';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/userProfile';
import { AppUser } from 'src/app/models/appUser';
import { File } from 'src/app/models/file';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private followService: FollowService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  profile$: Observable<Profile>;
  followers$: Observable<AppUser[]>;
  followings$: Observable<AppUser[]>;
  photos$: Observable<File[]>;

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));

  getProfile() {
    this.profileService.getProfileForUser(this.currentUser.id).subscribe(
      response => {this.profile$ = this.profileService.profile$, console.log(this.profile$)}
    );
  }

  getFollowers() {
    this.followService.getUserFollowing(this.currentUser.id, 'followers').subscribe(
      response => this.followers$ = this.followService.followers$
    )
  }

  getFollowings() {
    this.followService.getUserFollowing(this.currentUser.id, 'followings').subscribe(
      response => this.followings$ = this.followService.followings$
    );
  }

  getPhotos() {
    this.profileService.getPhotosForUser(this.currentUser.id).subscribe(
      response => this.photos$ = this.profileService.photos$
    )
  }

  // TabView
  index = 1;

  indexChanged(index: number) {
    this.index++;
    switch (index) {
      case 2:
        this.getPhotos();
        break;

      case 3:
        this.getFollowings();
        break;

      case 4:
        this.getFollowers();
        break;

      default:
        break;
    }
  }

}
