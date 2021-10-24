import { Routes, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: RoomComponent}
]

@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule,
    RouterModule.forChild(routes)
  ]
})
export class MessagingModule { }
