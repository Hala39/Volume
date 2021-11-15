import { Guid } from 'guid-typescript';
import { Notification } from 'src/app/models/notification';
import { PresenceService } from './presence.service';
import { PaginatedResult } from './../models/paginatedResult';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private apiCaller: HttpClient, private presenceService: PresenceService) { }

  baseUrl = environment.apiUrl + 'notification/';

  paginatedActivitiesResult = new PaginatedResult<Notification[]>();
  activitiesSource = new BehaviorSubject<Notification[]>([]);
  activities$ = this.activitiesSource.asObservable();

  paginatedNotificationsResult = new PaginatedResult<Notification[]>();
  notificationsSource = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSource.asObservable();

  getActivities(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<Notification[]>(this.baseUrl + 'activities', {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
        {
          var initialValue = this.activitiesSource.value;
          initialValue = initialValue.concat(response.body);
          this.activitiesSource.next(initialValue);
        }
        else 
        {
          this.activitiesSource.next(response.body);
        }
        
        this.paginatedActivitiesResult.result = response.body;

        if (response.headers.get("Pagination") !== null) {
          this.paginatedActivitiesResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  getNotifications(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<Notification[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true)
          {
            var initialValue = this.notificationsSource.value;
            initialValue = initialValue.concat(response.body);
            this.notificationsSource.next(initialValue);
          }
          else 
          {
            this.notificationsSource.next(response.body);
          }
            this.paginatedNotificationsResult.result = response.body;

        if (response.headers.get("Pagination") !== null) {
          this.paginatedNotificationsResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;

      })
    )
  }

  markRead() {
    return this.apiCaller.post(this.baseUrl + 'read', {}).pipe(
      map(response => {
        var currentValue = this.notificationsSource.value;
        currentValue.forEach(element => {
          if (element.seen === false) {
            element.seen = true;
          }
        });

        this.notificationsSource.next(currentValue);
      })
    );
  }

  readOne(id: Guid) {
    return this.apiCaller.post(this.baseUrl + 'read/one?id=' + id.toString(), {}).pipe(
      map(response => {
        console.log(response)
        var currentValue = this.notificationsSource.value;
        var index = currentValue.findIndex(n => n.id === id);
        if (index) {
          currentValue[index].seen = true;
          this.notificationsSource.next(currentValue);
        }
      })
    );
  }

  clearAll(predicate: string) {
    return this.apiCaller.delete(this.baseUrl + "?predicate=" + predicate).pipe(
      map(response => {
        if (predicate === 'activities') {
          this.activitiesSource.next([]);
        } else if (predicate === 'notifications') {
          this.notificationsSource.next([]);
        }
      })
    );
  }
}
