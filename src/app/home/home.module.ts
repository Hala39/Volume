import { BadgeModule } from 'primeng/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AddPostComponent } from './add-post/add-post.component';
import { AvatarModule } from 'primeng/avatar';
import {ToolbarModule} from 'primeng/toolbar';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import {ToggleButtonModule} from 'primeng/togglebutton';

@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    BadgeModule,
    MenubarModule,
    AvatarModule,
    ToolbarModule,
    EditorModule,
    FileUploadModule,
    ToggleButtonModule
  ]
})
export class HomeModule { }
