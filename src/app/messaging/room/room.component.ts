import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  chatRoomExpanded: boolean = false;

  expandChatRoom($event: boolean) {
    this.chatRoomExpanded = $event;
  }

  backToContacts($event: boolean) {
    this.chatRoomExpanded = !$event;
  }

  chatRoomListStyle1 = { 'height': '640px'};
  chatRoomListStyle2 = { 'height': '600px'};
  popupListStyle1 = { 'height': '700px'};

  visible = false;

}
