import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() accept = "image/*";
  @Output() fileSelectedEmitter = new EventEmitter<File>();

  fileSelected(event: any) {
    this.fileSelectedEmitter.emit(event.currentFiles[0])
  }
}
