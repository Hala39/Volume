import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
