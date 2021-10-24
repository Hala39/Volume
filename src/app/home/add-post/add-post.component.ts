import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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
    this.uploaderExpanded = false;
    this.cameraExpanded = false;
    this.editorExpanded = !this.editorExpanded;
  }


  // Uploader
  uploaderExpanded: boolean = false;
  uploadedFiles: any[] = [];

  expandUploader() {
    this.editorExpanded = false;
    this.cameraExpanded = false;
    this.uploaderExpanded = !this.uploaderExpanded;
  }

  onUpload(event: any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
  }

  // Camera
  cameraExpanded: boolean = false;

  expandCamera() {
    this.uploaderExpanded = false;
    this.editorExpanded = false;
    this.cameraExpanded = !this.cameraExpanded;
  }


}
