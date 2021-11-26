import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { Component, Input, OnInit } from '@angular/core';
import { SavedPost } from 'src/app/models/savedPost';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  @Input() post: SavedPost;

  navigate(id: number) {
    this.router.navigateByUrl("/post/" + id);
  }
}
