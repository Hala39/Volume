import { LikeService } from './../../services/like.service';
import { FollowService } from './../../services/follow.service';
import { UserCard } from 'src/app/models/userCard';
import { Observable } from 'rxjs';
import { CommentService } from './../../services/comment.service';
import { Comment } from './../../models/comment';
import { Post } from './../../models/post';
import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor(private commentService: CommentService, private likeService: LikeService,
    private followService: FollowService) {
    this.currentUser = JSON.parse(localStorage.getItem("userCard"));
  }

  ngOnInit(): void {
  }

  commentsExpanded: boolean = false;
  comments$: Observable<Comment[]>;

  currentUser: UserCard;
  content: string;

  likers$: Observable<AppUser[]>;

  @Input() post: Post;

  expandComments(postId: number) {
    this.commentService.listComments(postId).subscribe(
      response => this.comments$ = this.commentService.comments$
    );
    this.commentsExpanded = !this.commentsExpanded;
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe();
  }

  addComment() {
    this.commentService.addComment(this.post.id, this.content).subscribe(
      response => this.content = ""
    );
  }

  followToggle() {
    this.followService.followToggle(this.post.appUser.id).subscribe(
      response => this.post.isFollowing = !this.post.isFollowing
    );
  }

  likeToggle() {
    this.likeService.likeToggle(this.post.id).subscribe(
      response => this.post.isLikedByUser = !this.post.isLikedByUser
    )
  }

  getLikers() {
    this.likeService.getLikes(this.post.id).subscribe(
      response => this.likers$ = this.likeService.likers$
    );
    
  }
}
