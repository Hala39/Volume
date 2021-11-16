import { PresenceService } from './../../services/presence.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from "src/app/services/notification.service";


@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private presenceService: PresenceService) { }

  ngOnInit(): void {
    this.onNotificationsShow();
  }

  ngOnDestroy() {
    this.onNotificationsHide();
  }

  @Input() overlay = false;
  @Output() hideOverlayEmitter = new EventEmitter();
  notifications$: Observable<Notification[]>;

  pageNumber = 2;

  noMoreNotifications = false;


  onNotificationsShow() {
    this.notificationService.getNotifications().subscribe(
      response => 
      {
        this.notifications$ = this.notificationService.notifications$
      }
    );
  }

  onNotificationsLoad() {
    this.notificationService.getNotifications(this.pageNumber++, true).subscribe(
      response => {
        this.notifications$ = this.notificationService.notifications$;
        var pagination = this.notificationService.paginatedNotificationsResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
            this.noMoreNotifications = true;
        }
      }
    );

  }

  clearAllNotifications() {
    this.notificationService.clearAll("notifications").subscribe();
  }

  onNotificationsHide() {
    this.notificationService.markRead().subscribe(
      response => {
        this.presenceService.notificationAlertSource.next(false);
      }
    );
  }

  hideOverlay()  {
    this.hideOverlayEmitter.emit();
  }
}

