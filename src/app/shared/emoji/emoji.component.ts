import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() emojiEmitter = new EventEmitter<any>();

  select($event: any)
  {
    this.emojiEmitter.emit($event.emoji);
  }

  yellow = '#FFDE59';

}
