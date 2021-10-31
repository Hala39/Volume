import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SuccessComponent } from './success/success.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { AccountComponent } from './account/account.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import {TooltipModule} from 'primeng/tooltip';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import {BadgeModule} from 'primeng/badge';
import {ToolbarModule} from 'primeng/toolbar';
import {CheckboxModule} from 'primeng/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NetworkComponent } from './network/network.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    EditProfileComponent,
    SuccessComponent,
    RegisterFormComponent,
    AccountComponent,
    NetworkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    BadgeModule,
    ListboxModule,
    CardModule,
    CalendarModule,
    KeyFilterModule,
    DialogModule,
    AvatarModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule,
    TooltipModule,
    InputTextModule,
    InputSwitchModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    DividerModule,
    TimelineModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }