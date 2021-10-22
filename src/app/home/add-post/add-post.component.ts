import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploaderExpanded: boolean = false;
  cameraExpanded: boolean = false;
  editorExpanded: boolean = false;

  expandUploader() {
    this.editorExpanded = false;
    this.cameraExpanded = false;
    this.uploaderExpanded = !this.uploaderExpanded;
  }

  expandEditor() {
    this.uploaderExpanded = false;
    this.cameraExpanded = false;
    this.editorExpanded = !this.editorExpanded;
  }

  expandCamera() {
    this.uploaderExpanded = false;
    this.editorExpanded = false;
    this.cameraExpanded = !this.cameraExpanded;
  }


  uploadedFiles: any[] = [];

    onUpload(event: any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

    }
}
