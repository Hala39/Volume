import { UserRegister } from './../../models/userRegister';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(1);
  }

  checkbox: boolean = true;

  registrationForm: FormGroup;


  displayName = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required, Validators.minLength(6)]);


  register() {
    if (this.registrationForm.valid) {
      const userRegister: UserRegister = {
        displayName: this.displayName.value,
        email: this.email.value,
        password: this.password.value
      }
      this.messageService.add({severity: 'success', summary: 'Invalid Data', detail: 'Please enter a valid data!'});
      // this.userService.signUp(userRegister).subscribe();
      this.switch();
    } else {
      this.messageService.add({severity: 'warn', summary: 'Invalid Data', detail: 'Please enter a valid data!'});
    }
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    });
  }

}


