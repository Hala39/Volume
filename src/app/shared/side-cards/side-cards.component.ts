import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { AppUser } from '../../models/appUser';
import { UserCard } from '../../models/userCard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-cards',
  templateUrl: './side-cards.component.html',
  styleUrls: ['./side-cards.component.scss']
})
export class SideCardsComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getSuggestions();
  }

  suggestions$: Observable<AppUser[]>;
  pageSize = 5;
  pageNumber = 2;
  trends: string[] = [
    'AspNetCore', 'C#', 'Angular12', 'UI/UX', 'Programming', 'React', 'Ionic5', 'PrimeNg', 'Bootstrap'
  ];

  getSuggestions() {
    this.profileService.getSuggestedUsersList(this.pageSize).subscribe(
      response => this.suggestions$ = this.profileService.suggestions$
    )
  }

  remove($event: string) {
    var currentValue = this.profileService.suggestionsSource.value;
    currentValue = currentValue.filter(v => v.id !== $event);
    this.profileService.suggestionsSource.next(currentValue);
  }

  onSuggestionsLoad() {
    this.profileService.getSuggestedUsersList(this.pageSize, this.pageNumber++, true).subscribe(
      response => {
        this.suggestions$ = this.profileService.suggestions$;
        var pagination = this.profileService.paginatedSuggestionsResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMorePeople = true;
        }
      }
    )
  }

  noMorePeople = false;
  
}
