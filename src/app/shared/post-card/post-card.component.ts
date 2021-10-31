import { Comment } from './../../models/comment';
import { Post } from './../../models/post';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  commentsExpanded: boolean = false;

  @Input() post: Post;

  expandComments(postId: number) {
    this.commentsExpanded = !this.commentsExpanded;
  }
}
