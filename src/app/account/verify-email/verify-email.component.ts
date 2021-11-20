import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
   
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Input() email: string;

  switch() {
    this.activeIndexEmitter.emit(2);
  }

  token: string;

  checkRoute() {
    console.log(this.activatedRoute.url);
    // this.activatedRoute.queryParams.subscribe(queryParams => {
    //   this.token = queryParams.token;
    //   console.log(this.token + 'checkRoute')
    // });

    // if (this.token !== null || this.token !== undefined) {
    //   this.userService.verifyEmail(this.email, this.token).subscribe(
    //     response => this.switch()
    //   )
    //   console.log(this.token)
    // }
  }

  resendEmailVerification() {
    this.userService.resendEmailConfirmation(this.email).subscribe(
      response => this.messageService.add({severity: 'info', 
      summary: 'Email verification link was resent', detail: 'Please check your inbox and click on the link to proceed'})
    );
  }

}
