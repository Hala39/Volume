import { CanActivateGuard } from './../guards/can-activate.guard';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserAboutComponent } from './user-about/user-about.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TimeagoModule } from 'ngx-timeago';
import { ThreadComponent } from './thread/thread.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


const routes : Routes = [
  { path: ':id', component: ProfileComponent, canActivate: [CanActivateGuard]},
  { path: '', component: ProfileComponent, canActivate: [CanActivateGuard]},
  { path: 'messages/:id', component: ProfileComponent, canActivate: [CanActivateGuard]}
]

@NgModule({
  declarations: [
    ProfileComponent,
    UserAboutComponent,
    ThreadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    OverlayPanelModule,
    SlideMenuModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TabViewModule,
    AvatarModule,
    TooltipModule,
    MenuModule,
    CardModule,
    ScrollPanelModule,
    TimeagoModule.forChild({
      
    }),
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
