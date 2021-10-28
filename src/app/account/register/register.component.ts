import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
export enum PageNames {
  form,
  verification,
  profile,
  suggestions,
  success
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  items: MenuItem[] = [{
    label: 'Registration'
  },
  {
    label: 'Verification'
  },
  {
    label: 'Profile set-up'
  },
  {
    label: 'Following suggestions'
  },
  {
    label: 'Done!'
  }
];


  PageNames = PageNames;

  activeIndex = PageNames.form;


}
