import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() filter: boolean = true;
  @Input() listStyle = { 'height': '700px'};
  @Input() selectionMode: boolean = false;
  @Output() expandChatRoomEmitter = new EventEmitter<boolean>();
  chatRoomExpanded: boolean = false;

  expandChatRoom() {
    this.expandChatRoomEmitter.emit(true)
  }

  chats: Chat[] = [
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        id: '1',
        profilePhotoUrl: 'assets/images/jimmy.jpg',
        displayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        id: '2',
        profilePhotoUrl: 'assets/images/luna.jpg',
        displayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },

  ]

}
