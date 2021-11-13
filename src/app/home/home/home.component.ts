import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCard } from './../../models/userCard';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.getPosts(1);
  }

  posts$: Observable<Post[]>;

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));

  getPosts(pageNumber: number) {
    this.postService.getPosts(1, false).subscribe(
      response => {
        this.posts$ = this.postService.posts$;
      }
    ) 
  }

  pageNumber = 2;

  onScroll(e: any) {
    this.postService.getPosts(this.pageNumber++, true).subscribe();

  }

}
