import { UserService } from './../../services/user.service';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(private postService: PostService, private userService: UserService,
    private fb: FormBuilder) {
    this.user$ = this.userService.user$
  }

  ngOnInit(): void {
    this.build()
  }

  faGrinAlt = faGrinAlt;
  faTimes = faTimes;

  file: File = null;
  user$: Observable<UserCard>;
  

  // Editor
  editorToggle: boolean = false;

  toggleEditor() {
    this.photoUploadToggle = false;
    this.editorToggle = !this.editorToggle;
    this.displayDialog = true;
  }
  
  // Photos Uploader
  photoUploadToggle: boolean = false;
 
  togglePhotoUploader() {
    this.editorToggle = false;
    this.photoUploadToggle = !this.photoUploadToggle;
    this.displayDialog = true;
  }

  fileSelected($event: File) {
    this.file = $event;
  }

  // Dialog
  displayDialogFunc() {
    this.editorToggle = false;
    this.photoUploadToggle = false;
    this.displayDialog = true;
  }

  onHide() {
    this.inputForm.reset();
    this.file = null;
  }

  displayDialog = false;

  pending = false;

  addPost() {
    const post = {
      fileToUpload: this.file,
      description: this.description.value || ''
    };
    this.pending = true;
    this.inputForm.reset();
    this.postService.addPost(post).subscribe(
      response => {
        this.pending = false;
        this.displayDialog = false;
      }, error => {
        this.pending = false;
      }
    );
  }

  //emoji
  emojiExpanded: boolean = false;

  expandEmoji() {
    this.emojiExpanded = true;
  }

  hideEmoji() {
    this.emojiExpanded = false;
  }

  select($event: EmojiData) {
    let data = this.inputForm.get('description').value;
    if (!data)  data = '';
    this.inputForm.patchValue({"description": data + $event.native});
  }

  description = new FormControl();

  inputForm: FormGroup;

  build() {
    this.inputForm = this.fb.group({
      description: this.description
    })
  }

}
