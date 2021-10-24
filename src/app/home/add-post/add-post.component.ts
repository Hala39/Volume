import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor() { }

  // Icons

  ngOnInit(): void {
  }

  // Editor
  editorExpanded: boolean = false;

  expandEditor() {
    this.fileUploaderExpanded = false;
    this.editorExpanded = !this.editorExpanded;
  }


  // Files Uploader
  fileUploaderExpanded: boolean = false;
  uploadedFiles: any[] = [];

  expandFileUploader() {
    this.editorExpanded = false;
    this.fileUploaderExpanded = !this.fileUploaderExpanded;
  }

  onFileUpload(event: any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
  }

  
  // Photos Uploader
  photoUploaderExpanded: boolean = false;
  uploadedPhotos: any[] = [];

  expandPhotoUploader() {
    this.editorExpanded = false;
    this.photoUploaderExpanded = !this.photoUploaderExpanded;
  }

  onPhotoUpload(event: any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
  }

}
