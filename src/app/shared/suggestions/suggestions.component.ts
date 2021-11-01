import { FollowService } from './../../services/follow.service';
import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  constructor(private followService: FollowService) { }

  ngOnInit(): void {
  }

  @Input() users: AppUser[] = [];

  followToggle(id: string) {
    this.followService.followToggle(id).subscribe(
      response => 
      this.users.find(u => u.id === id).isFollowing = 
      !this.users.find(u => u.id === id).isFollowing
    );
  }
}
