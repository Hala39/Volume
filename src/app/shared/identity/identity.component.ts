import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  constructor(private fb: FormBuilder, 
      private profileService: ProfileService) { }

  ngOnInit(): void {
    this.build();
  }

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Input() registration: boolean = false;
  @Input() profile: Profile;

  displayDialog: boolean = false;

  
  myUploader($event: any) {

  }
  
  show() {
    this.displayDialog = true;
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

  switch() {
    this.activeIndexEmitter.emit(3);
  }

  profilePhoto = new FormControl();
  displayName = new FormControl(JSON.parse(localStorage.getItem("userCard")).displayName, Validators.required);
  title = new FormControl();
  hometown = new FormControl();
  phoneNumber = new FormControl();
  dob = new FormControl();
  gender = new FormControl(this.genders);

  saveChanges() {
    if (this.form.dirty) {
      const profile: Profile = {
        displayName: this.displayName.value,
        title: this.title.value,
        hometown: this.hometown.value,
        phoneNumber: this.phoneNumber.value,
        dob: this.dob.value,
        gender: this.gender.value
      }
      this.profileService.createOrUpdateProfile(profile).subscribe(
        response => this.switch()
      );
    }
  }
}
