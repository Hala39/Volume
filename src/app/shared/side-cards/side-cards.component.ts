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
      userPhoto: 'assets/images/jimmy.jpg',
      userName: 'Jimmy Los',
      role: 'CEO'
    },
    {
      userId: '2',
      userPhoto: 'assets/images/me.jpg',
      userName: 'Hala Taleb',
      role: 'Web Developer'
    },
    {
      userId: '3',
      userPhoto: 'assets/images/luna.jpg',
      userName: 'Luna Bader',
      role: 'Manager'
    },
  ]
}
