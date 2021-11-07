import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
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
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TimeagoClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { ThreadComponent } from './thread/thread.component';

const routes : Routes = [
  { path: ':id', component: ProfileComponent},
  {path: '', component: ProfileComponent}
]

@NgModule({
  declarations: [
    ProfileComponent,
    UserAboutComponent,
    ThreadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FileUploadModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    ToolbarModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TabViewModule,
    AvatarModule,
    DropdownModule,
    TooltipModule,
    MenuModule,
    CardModule,
    ScrollPanelModule,
    GalleriaModule,
    TimeagoModule.forChild({
      
    }),
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
