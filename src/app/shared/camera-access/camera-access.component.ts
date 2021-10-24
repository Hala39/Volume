import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-camera-access',
  templateUrl: './camera-access.component.html',
  styleUrls: ['./camera-access.component.scss']
})
export class CameraAccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setUpWebCam();
  }

  faSync = faSync;

  @Input() cameraExpanded: boolean = false;
  @Output() hideCameraEmitter = new EventEmitter<boolean>();

  hideCamera() {
    this.hideCameraEmitter.emit(false);
  }

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

    
  // Modals
  displayMaximizable: boolean;

  @Input() displayBasic: boolean = false;

  dialogStyle = {width: '40%'};

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }


}
