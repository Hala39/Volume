import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { faGrinAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Chat } from 'src/app/models/chat';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.build();
  }

  faTimes = faTimes;
  faGrinAlt = faGrinAlt;

  emojiExpanded: boolean;

  selectionMode: boolean = false;

  expandEmoji() {
    this.emojiExpanded = !this.emojiExpanded;
  }

  select($event: EmojiData) {
    let data = this.inputForm.get('message').value;
    if (!data)  data = '';
    this.inputForm.patchValue({"message": data + $event.native});
  }

  message: FormControl;

  inputForm: FormGroup;

  build() {
    this.inputForm = this.fb.group({
      message: this.message
    })
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
