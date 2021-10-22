import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  items: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
    {label: 'Search', icon: 'pi pi-fw pi-search'},
  ];

  ngOnInit() {
  }

}
