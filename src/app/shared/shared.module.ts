import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    PostCardComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    InputTextModule
  ]
})
export class SharedModule { }
