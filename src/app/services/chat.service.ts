import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Message } from 'src/app/models/message';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private apiCaller: HttpClient, private userService: UserService) { }

  baseUrl = environment.apiUrl + 'message/';

  threadSource = new BehaviorSubject<Message[]>([]);
  thread$ = this.threadSource.asObservable();
  paginatedThreadResult = new PaginatedResult<Message[]>();


  contactsSource = new BehaviorSubject<AppUser[]>([]);
  contacts$ = this.contactsSource.asObservable();
  paginatedContactsResult = new PaginatedResult<AppUser[]>();

  addMessage(recipientId: string, content: string, file: File, isPhoto: any) {
    let formData = new FormData();

    formData.append("SenderDisplayName", this.userService.userSource.value.displayName);
    formData.append("RecipientId", recipientId);
    formData.append("Content", content);
    formData.append("File", file);
    formData.append("IsPhoto", isPhoto);

    return this.apiCaller.post(this.baseUrl, formData).pipe(
      map(response => {
        this.getMessageThread(recipientId).subscribe()
      })
    );
  }

  getMessageThread(id: string) {
    let params = new HttpParams();
    return this.apiCaller.get<Message[]>(this.baseUrl + id, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedThreadResult.result = response.body;
        this.threadSource.next(response.body);

        if (response.headers.get("Pagination") !== null) {
          this.paginatedThreadResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    );
  }

  getContacts() {
    let params = new HttpParams();
    return this.apiCaller.get<AppUser[]>(this.baseUrl + 'contact', {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedContactsResult.result = response.body;
        this.contactsSource.next(response.body);
        
        if (response.headers.get("Pagination") !== null) {
          this.paginatedContactsResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }
        console.log(response.body)
        return response.body;
      })
    );
  }

  deleteMessage(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        var currentValue = this.threadSource.value;
        currentValue = currentValue.filter(m => m.id !== id);
        this.threadSource.next(currentValue);
      })
    );
  }

}
