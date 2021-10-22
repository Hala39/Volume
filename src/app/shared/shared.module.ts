import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { SideCardsComponent } from './side-cards/side-cards.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import {ListboxModule} from 'primeng/listbox';


@NgModule({
  declarations: [
    PostCardComponent,
    SideCardsComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    InputTextModule,
    ListboxModule,
    CardModule,
    TagModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule
  ],
  exports: [
    PostCardComponent,
    SideCardsComponent
  ]
})
export class SharedModule { }
