import { AppUser } from 'src/app/models/appUser';
import { Observable } from 'rxjs';
import { ChatService } from './../../services/chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { faGrinAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor(private fb: FormBuilder, private chatService: ChatService) { 
    this.thread$ = this.chatService.thread$;
  }

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

  message = new FormControl();

  inputForm: FormGroup;

  build() {
    this.inputForm = this.fb.group({
      message: this.message
    })
  }

  //Chat
  thread$: Observable<Message[]>;

  @Input() contactId: string;

  sendMessage() {
    this.chatService.addMessage(this.contactId, this.message.value, null, false).subscribe(
      response => this.inputForm.reset()
    );
  }
  
}
