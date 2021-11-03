import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(3);
  }

  close($event: any) {
    this.switch();
  }

}
