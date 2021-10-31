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

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  posts: Post[] = [];
  user: UserCard = JSON.parse(localStorage.getItem('userCard'));

  getPosts() {
    this.postService.getPosts().subscribe(
      response => this.posts = response
    )
  }

}
