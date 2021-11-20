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

  constructor(private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
   
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Input() email: string;

  switch() {
    this.activeIndexEmitter.emit(2);
  }

  resendEmailVerification() {
    this.userService.resendEmailConfirmation(this.email).subscribe(
      response => this.messageService.add({severity: 'info', 
      summary: 'Email verification link was resent', detail: 'Please re-check your inbox to proceed'})
    );
  }

}
