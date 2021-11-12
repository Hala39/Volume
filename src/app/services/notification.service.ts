import { PresenceService } from './presence.service';
import { PaginatedResult } from './../models/paginatedResult';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private apiCaller: HttpClient, private presenceService: PresenceService) { }

  baseUrl = environment.apiUrl + 'notification/';

  paginatedResult = new PaginatedResult<Notification[]>();

  activitiesSource = new BehaviorSubject<Notification[]>([]);
  activities$ = this.activitiesSource.asObservable();

  getActivities(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
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
        
        this.paginatedResult.result = response.body;

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    )
  }

  markRead() {
    return this.apiCaller.post(this.baseUrl + 'read', {});
  }

  deleteOne(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString());
  }

  clearAll(predicate: string) {
    return this.apiCaller.delete(this.baseUrl + "?predicate=" + predicate).pipe(
      map(response => {
        if (predicate === 'activities') {
          this.activitiesSource.next([]);
        } else if (predicate === 'notifications') {
          this.presenceService.notificationsSource.next([]);
        }
      })
    );
  }
}
