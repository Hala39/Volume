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
import {ToolbarModule} from 'primeng/toolbar';
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
    AvatarModule,
    ToolbarModule,
    DividerModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
