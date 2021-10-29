import { Component, OnInit } from '@angular/core';
import { UserCard } from 'src/app/models/userCard';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  users: UserCard[] = [
    {
      userId: '1',
      userProfilePhoto: 'assets/images/jimmy.jpg',
      userDisplayName: 'Jimmy Los',
      title: 'CEO'
    },
    {
      userId: '2',
      userProfilePhoto: 'assets/images/me.jpg',
      userDisplayName: 'Hala Taleb',
      title: 'Web Developer'
    },
    {
      userId: '3',
      userProfilePhoto: 'assets/images/luna.jpg',
      userDisplayName: 'Luna Bader',
      title: 'Manager'
    },
  ]
}
