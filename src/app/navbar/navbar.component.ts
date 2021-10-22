import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuExpanded: boolean;

  expandMenu() {
    this.menuExpanded = !this.menuExpanded;
  }

  items: MenuItem[] = [
    {label: 'Messages', icon: 'pi pi-fw pi-envelope'},
    {label: 'Notifications', icon: 'pi pi-fw pi-bell'},
    {label: 'Search', icon: 'pi pi-fw pi-search'}
  ];
}
