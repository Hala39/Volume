import { CanActivateGuard } from './guards/can-activate.guard';
import { CanLoadGuard } from './guards/can-load.guard';
import { AccountModule } from './account/account.module';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { RippleModule } from 'primeng/ripple';

import { MenubarModule } from 'primeng/menubar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuModule } from 'primeng/menu';
import { WebcamModule } from 'ngx-webcam';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BusyInterceptor } from './interceptors/busy.interceptor';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
// import { BusyInterceptor } from './interceptors/busy.interceptor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenuModule,
    ToastModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    RippleModule,
    AccountModule,
    AvatarModule,
    CardModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    MenubarModule,
    WebcamModule,
    EmojiModule,
    PickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  exports: [
    SharedModule,
    HomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CanLoadGuard,
    CanActivateGuard,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
