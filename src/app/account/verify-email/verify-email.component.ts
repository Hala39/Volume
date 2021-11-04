import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Input() email: string;

  switch() {
    this.activeIndexEmitter.emit(2);
  }

}
