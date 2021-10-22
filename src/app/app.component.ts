import { Component } from '@angular/core';
import { PrimeNGConfig, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Volume';
  
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  items: MenuItem[] = [
    {
      icon: 'pi pi-pencil',
    },
    {
      icon: 'pi pi-refresh',
    },
    {
      icon: 'pi pi-trash',
    },
    {
      icon: 'pi pi-upload'
    },
    {
      icon: 'pi pi-external-link'
    }
  ];

}
