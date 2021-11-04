import { UserService } from './../../services/user.service';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService) {
    this.user$ = this.userService.user$
  }

  ngOnInit(): void {
  }

  file: File = null;
  description: string = null;
  isPhoto: boolean = false;
  user$: Observable<UserCard>;
  

  // Editor
  editorToggle: boolean = false;

  toggleEditor() {
    this.fileUploadToggle = false;
    this.photoUploadToggle = false;
    this.editorToggle = !this.editorToggle;
    this.displayDialog = true;
  }

  // Files Uploader
  fileUploadToggle: boolean = false;

  toggleFileUploader() {
    this.editorToggle = false;
    this.photoUploadToggle = false;
    this.fileUploadToggle = !this.fileUploadToggle;
    this.displayDialog = true;
  }
  
  // Photos Uploader
  photoUploadToggle: boolean = false;

  togglePhotoUploader() {
    this.editorToggle = false;
    this.fileUploadToggle = false;
    this.photoUploadToggle = !this.photoUploadToggle;
    this.displayDialog = true;
  }

  fileSelected($event: File) {
    this.file = $event;
  }

  // Dialog
  displayDialogFunc() {
    this.displayDialog = true;
  }

  onHide() {
    this.description = null;
  }

  displayDialog = false;

  addPost(isPhoto: boolean) {
    const post = {
      isPhoto: isPhoto, 
      fileToUpload: this.file,
      description: this.description
    };
    this.description = null;
    this.postService.addPost(post).subscribe(
      response => {
        this.displayDialog = false;
        this.description = '';
      }
    );
  }
}
