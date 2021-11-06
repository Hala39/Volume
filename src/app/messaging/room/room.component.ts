import { AppUser } from 'src/app/models/appUser';
import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  contact: AppUser;

  contactSelected($event: any) {
    this.chatService.getMessageThread($event.id).subscribe(
      response => {
        this.contact = $event
      }
    );
  }


}
