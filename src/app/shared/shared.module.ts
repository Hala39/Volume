import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { ChatPopupComponent } from './chat-popup/chat-popup.component';
import { ChatsComponent } from './chats/chats.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CameraAccessComponent } from './camera-access/camera-access.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './emoji/emoji.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { WebcamModule } from 'ngx-webcam';

import { PostModalComponent } from './post-modal/post-modal.component';


@NgModule({
  declarations: [
    PostCardComponent,
    SideCardsComponent,
    ChatPopupComponent,
    ChatsComponent,
    ChatRoomComponent,
    CameraAccessComponent,
    EmojiComponent,
    PostModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    BadgeModule,
    WebcamModule,
    InputTextModule,
    ListboxModule,
    MenuModule,
    CardModule,
    TagModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    FontAwesomeModule,
    DialogModule,
    FormsModule,
    EmojiModule,
    PickerModule
  ],
  exports: [
    PostCardComponent,
    SideCardsComponent,
    ChatPopupComponent,
    ChatRoomComponent,
    ChatsComponent,
    CameraAccessComponent
  ]
})
export class SharedModule { }
