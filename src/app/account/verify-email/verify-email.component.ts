import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.checkRoute();
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Input() email: string;

  switch() {
    this.activeIndexEmitter.emit(2);
  }

  token: string;

  checkRoute() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.token = queryParams.token
    });

    if (this.token !== null) {
      this.userService.verifyEmail(this.email, this.token).subscribe(response => {
        if (response) {
          this.switch();
        }
      })
    }
  }

  resendEmailVerification() {
    this.userService.resendEmailConfirmation(this.email);
  }
}
