import { UserRegister } from './../../models/userRegister';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [TitleCasePipe]
})

export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private fb: FormBuilder, 
    private titleCasePipe: TitleCasePipe,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.buildForm();
    localStorage.clear();
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Output() emailEmitter = new EventEmitter<string>();

  switch(index: number) {
    this.activeIndexEmitter.emit(index);
  }

  checkbox: boolean = true;
  registrationForm: FormGroup;
  displayName = new FormControl("", {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
      updateOn: 'blur'
  });

  email = new FormControl("", { 
    validators: [
      Validators.required, 
      Validators.email
    ], 
      updateOn: 'blur'
  });

  password = new FormControl("", {
    validators: [
      Validators.required, 
      Validators.minLength(8)
    ],
      updateOn: 'blur'
  });


  register() {
    if (this.registrationForm.valid && this.checkbox) {
      const userRegister: UserRegister = {
        displayName: this.titleCasePipe.transform(this.displayName.value),
        email: this.email.value,
        password: this.password.value
      } 
      this.userService.signup(userRegister).subscribe(
        res => {
          this.emailEmitter.emit(this.email.value);
          this.switch(1);
        }
      );
    } 
    else {
      this.messageService.add({severity: 'warn', summary: 'Invalid Data', detail: 'Please take care of errors before proceeding.'});
    }
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      displayName: this.displayName,
      email: this.email,
      password: this.password
    });
  }

  passwordOn = true;

  //sign up with facebook
  signInWithFB(): void {
    this.userService.signInWithFB();
  }

  signInWithGoogle() {
    this.userService.signInWithGoogle();
  }

}


