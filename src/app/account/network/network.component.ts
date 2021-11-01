import { AppUser } from 'src/app/models/appUser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(4);
  }

  users: AppUser[] = [
    {
      id: '1',
      profilePhotoUrl: 'assets/images/jimmy.jpg',
      displayName: 'Jimmy Los',
      title: 'CEO',
      isFollowing: false
    },
    {
      id: '2',
      profilePhotoUrl: 'assets/images/me.jpg',
      displayName: 'Hala Taleb',
      title: 'Web Developer',
      isFollowing: false
    },
    {
      id: '3',
      profilePhotoUrl: 'assets/images/luna.jpg',
      displayName: 'Luna Bader',
      title: 'Manager',
      isFollowing: false
    },
  ]
}
