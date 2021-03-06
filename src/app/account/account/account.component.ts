import { ActivatedRoute } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
export enum PageNames {
  registration,
  verification,
  profile,
  network,
  done
}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
    var index = +this.activatedRoute.snapshot.paramMap.get('index')
    if (index) {
      this.events[1].isChecked = true;
      this.setActiveIndex(index);
    }
  }

  ngOnInit(): void {
  }

  PageNames = PageNames;

  activeIndex = PageNames.registration;

  events: any[]= [
    {index: 0, status: 'Registration', isChecked: true},
    {index: 1, status: 'Verification'},
    {index: 2, status: 'Profile'},
    {index: 3, status: 'Network'},
    {index: 4, status: 'Done'}

  ];

  setActiveIndex($event: number) {
    this.activeIndex = $event;
    this.events[$event].isChecked = true;
  }

  email: string;

  getEmail($event: string) {
    this.email = $event;
  }

  
}
