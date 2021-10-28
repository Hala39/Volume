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
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },
    {
      sender: {
        userId: '1',
        userProfilePhoto: 'assets/images/jimmy.jpg',
        userDisplayName: 'Jimmy Los'
      },
      content: 'Thank you! Take care.',
      date: 'Oct 5.'
    },
    {
      sender: {
        userId: '2',
        userProfilePhoto: 'assets/images/luna.jpg',
        userDisplayName: 'Luna Bader'
      },
      content: 'Hello sweetie, How is going?',
      date: '@2:am'
    },

  ]

}
