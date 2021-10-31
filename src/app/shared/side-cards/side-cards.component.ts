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
      id: '1',
      profilePhotoUrl: 'assets/images/jimmy.jpg',
      displayName: 'Jimmy Los',
      title: 'CEO'
    },
    {
      id: '2',
      profilePhotoUrl: 'assets/images/me.jpg',
      displayName: 'Hala Taleb',
      title: 'Web Developer'
    },
    {
      id: '3',
      profilePhotoUrl: 'assets/images/luna.jpg',
      displayName: 'Luna Bader',
      title: 'Manager'
    },
  ]
}
