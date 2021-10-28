import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AddPostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FontAwesomeModule,
    AvatarModule,
    ToolbarModule,
    EditorModule,
    FileUploadModule,
    ToggleButtonModule,
    FormsModule,
  ]
})
export class HomeModule { }
