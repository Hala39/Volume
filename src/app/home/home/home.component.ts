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

  constructor(private postService: PostService) {
    this.getPosts();
    this.posts$ = this.postService.posts$;
  }

  ngOnInit() {
    // this.getPosts();
  }

  posts$: Observable<Post[]>;

  user: UserCard = JSON.parse(localStorage.getItem('userCard'));

  getPosts() {
    this.postService.getPosts().subscribe(
      response => {
        this.posts$ = this.postService.posts$;
      }
    )

  }

}
