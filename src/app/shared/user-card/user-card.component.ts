import { Router } from '@angular/router';
import { FollowService } from './../../services/follow.service';
import { AppUser } from 'src/app/models/appUser';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  constructor(private followService: FollowService, private router: Router) { }

  ngOnInit(): void {
  }

  @Input() user: AppUser;
  @Output() removeFromSuggestionsEmitter = new EventEmitter<string>();
  
  followToggle(id: string) {
    this.followService.followToggle(id).subscribe(
      response => {
        this.user.isFollowing = !this.user.isFollowing;
        this.removeFromSuggestionsEmitter.emit(id);
      }
      
    );
  }

  goToProfile(id: string) {
    this.router.navigateByUrl('/profile/' + id);
  }
}
