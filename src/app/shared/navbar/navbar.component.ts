import { SearchService } from './../../services/search.service';
import { SearchOperation } from './../../models/searchOperation';
import { ProfileService } from 'src/app/services/profile.service';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { UserCard } from './../../models/userCard';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, 
    private searchService: SearchService,
    private profileService: ProfileService) {
    this.user$ = this.userService.user$
  }

  ngOnInit(): void {
    
  }

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));
  user$: Observable<UserCard>;

  searchOperations$: Observable<SearchOperation[]>;

  searchResults$: Observable<AppUser[]>;

  userId = this.user.id;

  keyword: string[];

  goToProfile() {
    this.router.navigateByUrl('/profile')
  }

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

  exit() {
    this.profileService.searchResultsSource.next(null);
    this.hideRecent = false;
  }

  hideRecent: boolean = false;
}
