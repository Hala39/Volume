import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signInWithFB(): void {
    this.userService.signInWithFB();
  }

  signInWithGoogle() {
    this.userService.signInWithGoogle();
  }

}
