import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/userProfile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  constructor(private fb: FormBuilder, private profileService: ProfileService) { 
  }

  ngOnInit(): void {
    this.build();
  }

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));
  profile: Profile = JSON.parse(localStorage.getItem("profile"));
  profile$: Observable<Profile>;

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Output() dataSavedEmitter = new EventEmitter<boolean>();
  @Output() photoSavedEmitter = new EventEmitter<boolean>();
  @Input() registration: boolean = false;

  displayDialog: boolean = false;

  
  myUploader($event: any) {

  }
  
  show() {
    this.displayDialog = true;
  }
 
  genders = [
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Unspecified'}
  ];

  form: FormGroup;

  build() {
    this.form = this.fb.group({
      profilePhoto: this.profilePhotoUrl,
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

  profilePhotoUrl = new FormControl(this.currentUser.profilePhotoUrl);
  displayName = new FormControl(this.currentUser.displayName, Validators.required);
  title = new FormControl(this.profile?.title);
  hometown = new FormControl(this.profile?.hometown);
  phoneNumber = new FormControl(this.profile?.phoneNumber);
  dob = new FormControl(this.profile?.dob);
  gender = new FormControl(this.profile?.gender);

  saveChanges() {
    if (this.form.dirty) {
      const profileToSend: Profile = {
        displayName: this.displayName.value,
        title: this.title?.value,
        hometown: this.hometown?.value,
        phoneNumber: this.phoneNumber?.value,
        dob: this.dob?.value,
        gender: this.gender.value?.name
      }

      if (this.gender.dirty) {
        profileToSend.gender = this.gender.value?.name
      } else {
        profileToSend.gender = this.profile?.gender
      }

      this.profileService.setUserBio(profileToSend).subscribe(
        response => this.dataSavedEmitter.emit(false)
      );
    }
  }

  file: File = null;

  fileSelected($event: File) {
    this.file = $event;
  }

  addProfilePhoto() {
    if (this.file !== null) {
      const setProfile = {
        file: this.file
      }
      this.profileService.setProfilePhoto(setProfile).subscribe(
        response => {
          this.profile$ = this.profileService.profile$;
          this.displayDialog = false;
        }
      )
        
    }
  }

}

