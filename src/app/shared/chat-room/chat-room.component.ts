import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons';
import { EmojiData, EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.build();
  }

  faGrinAlt = faGrinAlt;
  faTimes = faTimes;

  @Input() listStyle = { 'height': '600px'};
  @Input() chatRoomClass = '';

  @Output() backToContactsEmitter = new EventEmitter<boolean>();

  emojiExpanded: boolean;

  selectionMode: boolean = false;

  backToContacts() {
    this.backToContactsEmitter.emit(true);
  }

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

}
