import { Router } from '@angular/router';
import { UserCard } from './../../models/userCard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));
  userId = this.user.id;

  goToProfile() {
    this.router.navigateByUrl('/profile/' + this.userId)
  }
}
