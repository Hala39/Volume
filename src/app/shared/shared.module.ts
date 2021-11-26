import { ThreadComponent } from './../profile/thread/thread.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PostComponent } from './post/post.component';
import { BadgeModule } from 'primeng/badge';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { AddPostComponent } from './add-post/add-post.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './emoji/emoji.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { IdentityComponent } from './identity/identity.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UserCardComponent } from './user-card/user-card.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ChipsModule } from 'primeng/chips';
import { AddProfilePhotoComponent } from './add-profile-photo/add-profile-photo.component';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { ContactComponent } from './contact/contact.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
@NgModule({
  declarations: [
    PostCardComponent,
    EmojiComponent,
    NavbarComponent,
    IdentityComponent,
    UserCardComponent,
    AddPostComponent,
    FileUploaderComponent,
    AddProfilePhotoComponent,
    PostComponent,
    NotificationComponent,
    LoaderComponent,
    NotificationsPageComponent,
    ContactsPageComponent,
    SearchPageComponent,
    ThreadComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    KeyFilterModule,
    InputMaskModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    ChipsModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    FontAwesomeModule,
    DialogModule,
    FileUploadModule,
    DropdownModule,
    MenuModule,
    GalleriaModule,
    FormsModule,
    EmojiModule,
    PickerModule,
    RouterModule,
    KeyFilterModule,
    EditorModule,
    BadgeModule,
    ScrollPanelModule,
  ],
  exports: [
    PostCardComponent,
    NavbarComponent,
    EmojiComponent,
    IdentityComponent,
    UserCardComponent,
    AddPostComponent,
    AddProfilePhotoComponent,
    NotificationComponent,
    LoaderComponent,
    ThreadComponent
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
