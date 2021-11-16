import { Router } from '@angular/router';
import { PresenceService } from './../../services/presence.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/appUser';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
    constructor(private chatService: ChatService, private router: Router,
      private presenceService: PresenceService) { 
    this.contacts$ = this.chatService.contacts$;

  }

  ngOnInit(): void {
    this.getContacts();
  }

  @Input() overlay = false;
  contacts$: Observable<AppUser[]>;
  pageNumber = 2;


  noMoreContacts = false;

  onContactsLoad() {
    this.chatService.getContacts(this.pageNumber++, true).subscribe(
      response => {
        this.contacts$ = this.chatService.contacts$;
        var pagination = this.chatService.paginatedResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMoreContacts = true;
        }
      }
    )
  }

  getContacts() {
    this.chatService.getContacts().subscribe();
  }

  navigateToMessages(id: string) {
    this.presenceService.inboxNotificationSource.next(false);
    this.router.navigateByUrl("/profile/messages/" + id);
  }
}
