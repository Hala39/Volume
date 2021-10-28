import { UserCard } from './../../models/userCard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-cards',
  templateUrl: './side-cards.component.html',
  styleUrls: ['./side-cards.component.scss']
})
export class SideCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  trends: string[] = [
    'AspNetCore', 'C#', 'Angular12', 'UI/UX', 'Programming', 'React', 'Ionic5', 'PrimeNg', 'Bootstrap'
  ];

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
