import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor() { }

  // Icons
  faSync = faSync;

  ngOnInit(): void {
    this.setUpWebCam();
  }

  
  // Modals
  displayMaximizable: boolean;
  displayBasic: boolean = false;

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
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
  showWebcam: boolean;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string;
  errors: WebcamInitError[] = [];

   webcamImage: WebcamImage = null;

  private trigger: Subject<void> = new Subject<void>();

  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  setUpWebCam() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  expandCamera() {
    this.uploaderExpanded = false;
    this.editorExpanded = false;
    this.cameraExpanded = !this.cameraExpanded;
    this.showBasicDialog();
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.showMaximizableDialog();
    this.displayBasic = false;
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  showNextWebcam(directionOrDeviceId: boolean|string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
