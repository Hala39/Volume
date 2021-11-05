import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria'
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserAboutComponent } from './user-about/user-about.component';

const routes : Routes = [
  { path: ':id', component: ProfileComponent},
  {path: '', component: ProfileComponent}
]

@NgModule({
  declarations: [
    ProfileComponent,
    UserAboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    TabViewModule,
    AvatarModule,
    DropdownModule,
    TooltipModule,
    CardModule,
    GalleriaModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
