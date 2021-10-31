import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(4);
  }

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
