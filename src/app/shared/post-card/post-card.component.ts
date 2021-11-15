import { Guid } from 'guid-typescript';
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
import { Component, Input, OnInit, Output, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AppUser } from 'src/app/models/appUser';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit, OnDestroy {

  constructor(private commentService: CommentService, private likeService: LikeService,
    private profileService: ProfileService, private userService: UserService,
    private router: Router, private fb: FormBuilder,
    private followService: FollowService, private postService: PostService) {
    this.user$ = this.userService.user$;
    this.comments$ = this.commentService.comments$;

  }

  ngOnInit(): void {
    this.group();
    this.buildCommentForm();
  }

  ngOnDestroy() {
    this.commentService.stopHubConnection();
  }


  displayDialog = false;

  @Input() commentsExpanded: boolean = false;
  comments$: Observable<Comment[]>;
  commentForm: FormGroup;
  content = new FormControl('', Validators.required);

  buildCommentForm() {
    this.commentForm = this.fb.group({
      content: this.content
    })
  }

  likers$: Observable<AppUser[]>;
  user$: Observable<UserCard>;

  @Input() post: Post;

  @ViewChild('scroller', {static: false}) scrollFrame: any;

  goToProfile(id: string) {
    this.router.navigateByUrl('/profile/' + id);
  }

  savePending = false;
  saveToggle(id: number) {
    this.savePending = true;
    this.postService.savePostToggle(id).subscribe(
      response => {
        this.savePending = false;
        this.post.isSavedByUser = !this.post.isSavedByUser;
      }
    )
  }

  expandComments(postId: number) {
    this.commentsExpanded = !this.commentsExpanded;
    if (this.commentsExpanded === true) {
      this.commentService.createHubConnection(postId);
    } else {
      this.commentService.stopHubConnection();
    }
  }

  deleteComment(id: Guid) {
    this.commentService.deleteComment(id).subscribe(
      response => this.post.commentsCount--
    );
  }

  addComment() {
    this.commentService.addComment(this.post.id, this.content.value).then(
      response => {
        this.commentForm.reset();
        this.post.commentsCount++;
        this.scrollFrame.scrollTop(0);
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

  displayLikers = false;
  noMoreLikers = false;
  pageNumber = 2;

  showLikers() {
    this.displayLikers = true;
  }

  getLikers() {
    this.likeService.getLikes(this.post.id).subscribe(
      response => this.likers$ = this.likeService.likers$
    );
  }

  loadMoreLikers() {
    this.likeService.getLikes(this.post.id, this.pageNumber++, true).subscribe(
      response => {
        this.likers$ = this.likeService.likers$;
        var pagination = this.likeService.paginatedResult.pagination;
        if (pagination.currentPage === pagination.totalPages) {
          this.noMoreLikers = true;
        }
      }
    );
  }

  noMoreComments = false;
  loadMoreComments() {
     this.commentService.loadComments(this.post.id, this.pageNumber++, true).subscribe(
       response => {
        var pagination = this.commentService.paginatedResult.pagination;
         if (pagination.currentPage === pagination.totalPages) {
          this.noMoreComments = true;
         }
       }
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

  description = new FormControl(Validators.required);

  hideDialog() {
    this.displayDialog = false;
  }

  onDialogSHow() {
    this.description.setValue(this.post.description);
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
    if (this.description.value.length > 0 && this.description !== null)
    this.postService.updatePost(this.post.id, this.description.value).subscribe(
      response => {
        this.hideDialog();
        this.post.description = this.description.value;
      }
    )

  }

  faTimes = faTimes;
  faGrinAlt = faGrinAlt;
  
  inputForm: FormGroup;

  group() {
    this.inputForm = this.fb.group({
      description: this.description
    })
  }
  
  emojiExpanded: boolean = false;

  expandEmoji() {
    this.emojiExpanded = true;
  }

  hideEmoji() {
    this.emojiExpanded = false;
  }

  select($event: EmojiData) {
    if (this.displayDialog === true) {
      let data = this.inputForm.get('description').value;
      if (!data)  data = '';
      this.inputForm.patchValue({"description": data + $event.native});
    }

    if (this.displayDialog === false) {
      let data = this.commentForm.get('content').value;
      if (!data)  data = '';
      this.commentForm.patchValue({"content": data + $event.native});
    }
    
  }

}




