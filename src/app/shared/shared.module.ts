import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
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
import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';


@NgModule({
  declarations: [
    PostCardComponent,
    SideCardsComponent,
    ChatPopupComponent,
    ChatsComponent,
    ChatRoomComponent
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
    AvatarModule,
    AvatarGroupModule,
  ],
  exports: [
    PostCardComponent,
    SideCardsComponent,
    ChatPopupComponent,
    ChatsComponent
  ]
})
export class SharedModule { }
