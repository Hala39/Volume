import { UserCard } from './../../models/userCard';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() users: UserCard[] = [];
}
