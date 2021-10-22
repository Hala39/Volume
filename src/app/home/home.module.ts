import { BadgeModule } from 'primeng/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    BadgeModule,
    MenubarModule
  ]
})
export class HomeModule { }
