import { Guid } from 'guid-typescript';
import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/notification';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
 
  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
  }

  @Input() notification: Notification;
  @Input() predicate: string = 'notification';
  @Output() hideOverlayEmitter = new EventEmitter();

  navigate(id: Guid) {
    this.hideOverlayEmitter.emit();
    switch (this.notification.stimulation) {
      case 0:
        this.router.navigateByUrl('/post/' + this.notification.path);
        break;

      case 1: 
      this.router.navigateByUrl('/post/' + this.notification.path);
      break;

      case 2: 
      if (this.notification.stimulatorId !== (null || undefined)) {
        this.router.navigateByUrl('/profile/' + this.notification.stimulatorId);
      } else {
        this.router.navigateByUrl('/profile/' + this.notification.targetId);
      }
        
        break;

      default:
        break;
    }
  }
  
}
