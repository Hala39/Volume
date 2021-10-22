import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { RippleModule } from 'primeng/ripple';

import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MenuModule} from 'primeng/menu';
import { WebcamModule } from 'ngx-webcam';
import { ButtonModule } from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    RippleModule,
    AvatarModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    MenubarModule,
    WebcamModule
  ],
  exports: [
    SharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
