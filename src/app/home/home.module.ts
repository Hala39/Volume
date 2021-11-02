import { DividerModule } from 'primeng/divider';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FontAwesomeModule,
    AvatarModule,
    ToolbarModule,
    FileUploadModule,
    ToggleButtonModule,
    DividerModule,
    FormsModule,
    RouterModule
  ]
})
export class HomeModule { }
