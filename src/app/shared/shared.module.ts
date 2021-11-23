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
import { LoginFormComponent } from './login-form/login-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { SideCardsComponent } from './side-cards/side-cards.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './emoji/emoji.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { IdentityComponent } from './identity/identity.component';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UserCardComponent } from './user-card/user-card.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {ChipsModule} from 'primeng/chips';
import { AddProfilePhotoComponent } from './add-profile-photo/add-profile-photo.component';
import { NotificationComponent } from './notification/notification.component';
import { LoaderComponent } from './loader/loader.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { NotificationsPageComponent } from './notifications-page/notifications-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { InputMaskModule } from 'primeng/inputmask';
@NgModule({
  declarations: [
    PostCardComponent,
    SideCardsComponent,
    EmojiComponent,
    NavbarComponent,
    LoginFormComponent,
    GalleriaComponent,
    IdentityComponent,
    UserCardComponent,
    AddPostComponent,
    FileUploaderComponent,
    AddProfilePhotoComponent,
    PostComponent,
    NotificationComponent,
    LoaderComponent,
    BookmarkComponent,
    NotificationsPageComponent,
    ContactsPageComponent,
    SearchPageComponent,
  ],
  imports: [
    CommonModule,
    InputMaskModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    ChipsModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    CardModule,
    TagModule,
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
    InputTextareaModule,
    BadgeModule,
    ScrollPanelModule
  ],
  exports: [
    PostCardComponent,
    SideCardsComponent,
    GalleriaComponent,
    NavbarComponent,
    EmojiComponent,
    LoginFormComponent,
    IdentityComponent,
    UserCardComponent,
    AddPostComponent,
    AddProfilePhotoComponent,
    NotificationComponent,
    LoaderComponent,
    BookmarkComponent
  ]
})
export class SharedModule { }
