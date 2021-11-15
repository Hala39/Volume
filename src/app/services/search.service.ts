import { PaginatedResult } from './../models/paginatedResult';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchOperation } from './../models/searchOperation';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiCaller: HttpClient) { }

  baseUrl = environment.apiUrl + 'search/';

  searchOperationsSource = new BehaviorSubject<SearchOperation[]>([]);
  searchOperations$ = this.searchOperationsSource.asObservable();
  paginatedResult = new PaginatedResult<SearchOperation[]>();

  addSearchOperation(searchOperation: SearchOperation) {
    return this.apiCaller.post(this.baseUrl + '?keyword=' + searchOperation.keyword, {}).pipe(
      map(response => {
        this.getRecentSearches().subscribe();
      })
    );
  }

  getRecentSearches(pageNumber?: number, scroll?: boolean) {
    let params = new HttpParams();
    if(pageNumber) {
      params = params.append("pageNumber", pageNumber.toString());
    }
    return this.apiCaller.get<SearchOperation[]>(this.baseUrl, {observe: 'response', params}).pipe(
      map(response => {
        if (scroll === true) {
          var initialValue = this.searchOperationsSource.value;
            initialValue = initialValue.concat(response.body);
            this.searchOperationsSource.next(initialValue);
        } else {
          this.searchOperationsSource.next(response.body);
        }

        if (response.headers.get("Pagination") !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
        }

        return response.body;
      })
    );
  }

  clearRecentSearches() {
    return this.apiCaller.delete(this.baseUrl).pipe(
      map(response => {
        this.searchOperationsSource.next([]);
      })
    )
  }

  removeOneOperation(id: number) {
    return this.apiCaller.delete(this.baseUrl + id.toString()).pipe(
      map(response => {
        this.getRecentSearches().subscribe()
        // var currentValue = this.searchOperationsSource.value;
        // currentValue.filter(so => so.id !== id);
        // this.searchOperationsSource.next(currentValue);
      })
    )
  }
}
