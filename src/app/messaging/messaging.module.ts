import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room/room.component';



@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InputTextModule
  ]
})
export class MessagingModule { }
