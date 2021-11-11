import { CanActivateGuard } from './../guards/can-activate.guard';
import { DividerModule } from 'primeng/divider';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [CanActivateGuard]}
]
@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
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
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
