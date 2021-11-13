import { PresenceService } from './../../services/presence.service';
import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/notification';
import { Component, Input, OnInit } from '@angular/core';

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

  navigate() {
    switch (this.notification.stimulation) {
      case 0 || 1:
        this.router.navigateByUrl('/post/' + this.notification.path);
        break;
      case 2: 
        this.router.navigateByUrl('/profile/' + this.notification.path);
        break;

      default:
        break;
    }
  }

  delete() {
    this.notificationService.deleteOne(this.notification.id).subscribe(
      response => {
        if (this.predicate === 'notification') {
          var currentValue = this.notificationService.notificationsSource.value;
          currentValue = currentValue.filter(n => n.id !== this.notification.id);
          this.notificationService.notificationsSource.next(currentValue);
        } else if (this.predicate === 'activities') {
          var currentValue = this.notificationService.activitiesSource.value;
          currentValue = currentValue.filter(a => a.id !== this.notification.id);
          this.notificationService.activitiesSource.next(currentValue);
        }
      }
    );
  }
}
