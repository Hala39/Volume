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
      userPhoto: 'assets/images/Volume.png',
      userName: 'Dima Awada'
    },
    date: '1 Year ago',
    isLikedByMe: true,
    likesCount: 10,
    comments: [],
    description: 'Lorem ipsum sit amet',
    photo: 'assets/images/Volume.png'

  }

  comment1: Comment = {
    postId: 1,
    userCard: {
      userId: '2',
      userPhoto: 'assets/images/me.jpg',
      userName: 'Hala Taleb'
    },
    content: 'May Allah keep you safe my Daughter!',
    date: '@2:00 pm'
  };

  comment2: Comment = {
    postId: 1,
    userCard: {
      userId: '3',
      userPhoto: 'assets/images/Volume.png',
      userName: 'Yasin Awada'
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
