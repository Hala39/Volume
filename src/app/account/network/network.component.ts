import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { AppUser } from 'src/app/models/appUser';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getSuggestions();
  }

  suggestions$: Observable<AppUser[]>;

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(4);
  }

  getSuggestions() {
    this.profileService.getSuggestedUsersList().subscribe(
      response => this.suggestions$ = this.profileService.suggestions$
    )
  }

  remove($event: string) {
    this.profileService.getSuggestedUsersList().subscribe()
  }
}
