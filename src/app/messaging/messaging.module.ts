import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ListboxModule } from 'primeng/listbox';
import { Routes, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './contacts/contacts.component';
import { ThreadComponent } from './thread/thread.component';

const routes: Routes = [
  {path: '', component: RoomComponent}
]

@NgModule({
  declarations: [
    RoomComponent,
    ContactsComponent,
    ThreadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    ListboxModule,
    AvatarModule,
    ToolbarModule,
    FontAwesomeModule,
    CardModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MessagingModule { }
