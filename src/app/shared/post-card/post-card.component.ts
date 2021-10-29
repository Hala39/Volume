import { Comment } from './../../models/comment';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';

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

  post: Post = {
    postId: 1,
    userCard: {
      userId: '1',
      userProfilePhoto: 'assets/images/jimmy.jpg',
      userDisplayName: 'Jimmy Los'
    },
    date: '1 Year ago',
    isLikedByMe: true,
    likesCount: 10,
    comments: [],
    description: 'Lorem ipsum sit amet lorem ipsum sit sit ameta How are you today? I am ;ost',
    photo: 'assets/images/science.png'

  }

  comment1: Comment = {
    postId: 1,
    userCard: {
      userId: '2',
      userProfilePhoto: 'assets/images/me.jpg',
      userDisplayName: 'Hala Taleb'
    },
    content: 'May Allah keep you safe my Daughter!',
    date: '@2:00 pm'
  };

  comment2: Comment = {
    postId: 1,
    userCard: {
      userId: '3',
      userProfilePhoto: 'assets/images/volume-light.png',
      userDisplayName: 'Yasin Awada'
    },
    content: 'I Love you baby! Take care of yourself',
    date: '@2:30 pm'
  };

  posts: Post[] = [this.post];
  comments: Comment[] = [this.comment1, this.comment2];

  expandComments(postId: number) {
    this.commentsExpanded = !this.commentsExpanded;
  }

}
