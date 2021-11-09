import { PresenceService } from './../../services/presence.service';
import { UserService } from './../../services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { PostService } from './../../services/post.service';
import { LikeService } from './../../services/like.service';
import { FollowService } from './../../services/follow.service';
import { UserCard } from 'src/app/models/userCard';
import { Observable } from 'rxjs';
import { CommentService } from './../../services/comment.service';
import { Comment } from './../../models/comment';
import { Post } from './../../models/post';
import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit, OnDestroy {

  constructor(private commentService: CommentService, private likeService: LikeService,
    private profileService: ProfileService, private userService: UserService,
    private router: Router,
    private followService: FollowService, private postService: PostService) {
    this.user$ = this.userService.user$;
    this.comments$ = this.commentService.comments$;

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.commentService.stopHubConnection();
  }

  displayDialog = false;

  @Input() commentsExpanded: boolean = false;
  comments$: Observable<Comment[]>;

  content: string;

  likers$: Observable<AppUser[]>;
  user$: Observable<UserCard>;

  @Input() post: Post;

  goToProfile(id: string) {
    this.router.navigateByUrl('/profile/' + id);
  }

  expandComments(postId: number) {
    this.commentsExpanded = !this.commentsExpanded;
    if (this.commentsExpanded === true) {
      this.commentService.createHubConnection(postId);
    } else {
      this.commentService.stopHubConnection();
    }
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe(
      response => this.post.commentsCount--
    );
  }

  addComment() {
    this.commentService.addComment(this.post.id, this.content).then(
      response => {
        this.content = "";
        this.post.commentsCount++;
      }
    );
  }

  followToggle() {
    this.followService.followToggle(this.post.appUser.id).subscribe(
      response => {
        var currentValue = this.postService.postsSource.value;
        currentValue.forEach(element => {
          if (element.appUser.id === this.post.appUser.id) {
            element.isFollowing = !element.isFollowing
          }
        });
        this.postService.postsSource.next(currentValue);
      }
    );
  }

  likeToggle() {
    this.likeService.likeToggle(this.post.id).subscribe(
      response => {
        this.post.isLikedByUser = !this.post.isLikedByUser;
        if (this.post.isLikedByUser) {
          this.post.likesCount++;
        } else {
          this.post.likesCount--;
        }
      }
    )
  }

  getLikers() {
    this.likeService.getLikes(this.post.id).subscribe(
      response => this.likers$ = this.likeService.likers$
    );
    
  }

  items : MenuItem[] = [
    {
      label: 'Edit', 
      icon: 'pi pi-fw pi-pencil', 
      command: () => {
        this.displayDialog = true;
      }
    },
    {
      label: 'Delete', 
      icon: 'pi pi-fw pi-trash',
      command: () => {
        this.postService.deletePost(this.post.id).subscribe(
          response => {
            
          }
        );
      }
    },
    {
      label: 'Set as profile picture', 
      icon: 'pi pi-fw pi-user',
      command: () => {
        const setProfile = {
          url: this.post.file.url
        }
          this.profileService.setProfilePhoto(setProfile).subscribe( 
        );
      }
    }
  ]

  description: string;

  hideDialog() {
    this.displayDialog = false;
  }

  onDialogSHow() {
    this.description = this.post.description;
  }

  onMenuShow() {
    this.items[2].visible = this.isItemVisible();
    this.items[2].disabled = this.isItemDisabled();
  }

  isItemVisible(): boolean {
    if (this.post.file === null || this.post.file.isPhoto === false) {
      return false;
    } 
    return true;
  }

  isItemDisabled() : boolean {
    if (this.post.file !== null && this.post.file.url === this.userService.userSource.value.profilePhotoUrl) {
      return true;
    }

    return false;
  }

  saveChanges() {
    if (this.description.length > 0 && this.description !== null)
    this.postService.updatePost(this.post.id, this.description).subscribe(
      response => {
        this.hideDialog();
        this.post.description = this.description;
      }
    )

  }

  

}




