import { Observable } from 'rxjs';
import { ChatService } from './../../services/chat.service';
import { MenuItem } from 'primeng/api';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }

  contacts$: Observable<AppUser[]>;
  @Output() selectedContactEmitter = new EventEmitter<AppUser>();

  ngOnInit(): void {
    this.chatService.getContacts().subscribe(
      response => this.contacts$ = this.chatService.contacts$
    )
  }

  items: MenuItem[] = [

  ]

  selectedContact: AppUser;

  selectContact() {
    this.selectedContactEmitter.emit(this.selectedContact);
  }

}
