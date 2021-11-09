import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private router: Router,
    private commentService: CommentService) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  postId = +this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.postService.getPostDetails(this.postId).subscribe(
      response => this.post = response
    )
    this.commentService.createHubConnection(this.postId);
  }

  post: Post;

}
