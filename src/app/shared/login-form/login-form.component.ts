import { Router } from '@angular/router';
import { UserLogin } from '../../models/userLogin';
import { AppUser } from '../../models/appUser';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.userService.logout();

  }

  loginForm: FormGroup;

  email = new FormControl("", { 
    validators: [
      Validators.required, 
      Validators.email
    ], 
      updateOn: 'blur'
  });

  password = new FormControl("", {
    validators: [
      Validators.required
    ],
      updateOn: 'blur'
  });

  buildForm() {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  pending: boolean = false;

  login() {
    if(this.loginForm.valid) {
      const userLogin: UserLogin = {
        email: this.email.value,
        password: this.password.value
      }
      this.pending = true;
      this.userService.login(userLogin).subscribe(
        response => this.pending = false, 
        error => this.pending = false
      );
    } else {
      this.messageService.add({severity: 'warn', summary: 'Invalid Data', detail: 'Please re-check the data you entered.'});
    }
  }

  passwordOn = true;

  togglePassword() {
    this.passwordOn = !this.passwordOn;
  }

}
