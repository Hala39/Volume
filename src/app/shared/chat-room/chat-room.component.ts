import { Component, OnInit } from '@angular/core';
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

  emojiExpanded: boolean;

  expandEmoji() {
    this.emojiExpanded = !this.emojiExpanded;
  }

  selectedEmoji: EmojiData;

  select($event: any) {
    this.selectedEmoji = $event;
    let data = this.inputForm.get('message').value;
    if (!data)  data = '';
    this.inputForm.patchValue({"message": data + this.selectedEmoji.native});
  }

  message: FormControl;

  inputForm: FormGroup;

  build() {
    this.inputForm = this.fb.group({
      message: this.message
    })
  }

}
