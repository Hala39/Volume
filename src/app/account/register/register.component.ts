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

  displayDialog: boolean = false;


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
      Validators.minLength(6)
    ],
      updateOn: 'blur'
  });


  register() {
    if (this.registrationForm.valid && this.checkbox) {
      const userRegister: UserRegister = {
        displayName: this.displayName.value,
        email: this.email.value,
        password: this.password.value
      } 
      this.userService.signup(userRegister).subscribe(
        res => this.switch()
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

}


