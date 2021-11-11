import { Notification } from 'src/app/models/notification';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() notification: Notification;

}
