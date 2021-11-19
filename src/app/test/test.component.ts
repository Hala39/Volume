import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(x => console.log(x));
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }
}
