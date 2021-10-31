import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.build();
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();

  switch() {
    this.activeIndexEmitter.emit(3);
  }


  displayDialog: boolean = false;
  
  show() {
    this.displayDialog = true;
  }


  myUploader($event: any) {

  }

  genders = [
    {name: 'Gender', inactive: true},
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Unspecified'}
  ];

  form: FormGroup;

  build() {
    this.form = this.fb.group({
      profilePhoto: this.profilePhoto,
      displayName: this.displayName,
      title: this.title,
      hometown: this.hometown,
      phoneNumber: this.phoneNumber,
      dob: this.dob,
      gender: this.gender
    })
  }

  userDisplayName = JSON.parse(localStorage.getItem("userCard")).displayName;

  profilePhoto = new FormControl();
  displayName = new FormControl(this.userDisplayName);
  title = new FormControl();
  hometown = new FormControl();
  phoneNumber = new FormControl();
  dob = new FormControl();
  gender = new FormControl(this.genders);
}
