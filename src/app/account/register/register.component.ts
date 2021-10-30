import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(1);
  }

  value: boolean = true;

}
