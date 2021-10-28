import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { StepsModule } from 'primeng/steps';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SuccessComponent } from './success/success.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginFormComponent,
    VerifyEmailComponent,
    EditProfileComponent,
    SuccessComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    StepsModule,
    CardModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
