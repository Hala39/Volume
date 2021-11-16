import { ProfileService } from './../../services/profile.service';
import { SearchService } from './../../services/search.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/appUser';
import { SearchOperation } from 'src/app/models/searchOperation';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private searchService: SearchService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.onShow();
  }

  @Input() overlay = false;
  
  searchOperations$: Observable<SearchOperation[]>;

  searchResults$: Observable<AppUser[]>;

  keyword: string[];

  exit() {
    this.profileService.searchResultsSource.next(null);
    this.hideRecent = false;
  }

  hideRecent: boolean = false;

  search(keyword?: string) {
    if (keyword !== null && keyword?.length > 0)
    {
      var word = keyword;
    }
    else 
    {
      var word = this.keyword.join(" ");
    }
    this.profileService.getProfilesList(word).subscribe(
      response => {
        this.searchResults$ = this.profileService.searchResults$;
        this.hideRecent = true;
      }
    );
  }

  removeOneOperation(id: number) {
    this.searchService.removeOneOperation(id).subscribe();
  }

  clearAll() {
    this.searchService.clearRecentSearches().subscribe();
  }

  onShow() {
    this.searchService.getRecentSearches().subscribe(
      response => {
        this.searchOperations$ = this.searchService.searchOperations$
      }
    )
  }
  pageNumber = 2;
  noMoreKeywords = false;
  onKeywordsLoad() {
    this.searchService.getRecentSearches(this.pageNumber++, true).subscribe(
      response => {
        var pagination = this.searchService.paginatedResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMoreKeywords = true;
        }
      }
    )
  }

}
