import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TagModule } from 'primeng/tag';
import { SideCardsComponent } from './side-cards/side-cards.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CanActivateGuard } from './../guards/can-activate.guard';
import { DividerModule } from 'primeng/divider';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AvatarGroupModule } from 'primeng/avatargroup';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [CanActivateGuard]}
]
@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    LoginFormComponent,
    SideCardsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TagModule,
    AvatarGroupModule,
    ScrollPanelModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    AvatarModule,
    KeyFilterModule,
    DividerModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
