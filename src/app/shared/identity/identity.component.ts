import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserCard } from 'src/app/models/userCard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Profile } from 'src/app/models/userProfile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss'],
  providers: [TitleCasePipe]
})
export class IdentityComponent implements OnInit {

  constructor(private fb: FormBuilder, private profileService: ProfileService,
    private titleCasePipe: TitleCasePipe) { 
  }

  ngOnInit(): void {
    this.build();
  }

  currentUser: UserCard = JSON.parse(localStorage.getItem("userCard"));
  profile: Profile = JSON.parse(localStorage.getItem("profile"));
  profile$: Observable<Profile>;

  user$: Observable<UserCard>;

  @Output() activeIndexEmitter = new EventEmitter<number>();
  @Output() dataSavedEmitter = new EventEmitter<boolean>();
  @Output() photoSavedEmitter = new EventEmitter<boolean>();
  
  @Input() registration: boolean = false;
 
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

  close() {
    this.switch();
    this.dataSavedEmitter.emit(false)
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
    if (this.form.dirty && this.form.valid) {
      const profileToSend: Profile = {
        displayName: this.titleCasePipe.transform(this.displayName.value),
        title: this.titleCasePipe.transform(this.title?.value),
        hometown: this.titleCasePipe.transform(this.hometown?.value),
        phoneNumber: this.phoneNumber?.value,
        dob: this.dob?.value,
        gender: this.gender.value?.name || null
      }

      if (this.gender.dirty) {
        profileToSend.gender = this.gender.value?.name
      } else {
        profileToSend.gender = this.profile?.gender
      }
      this.pending = true;
      this.profileService.setUserBio(profileToSend).subscribe(
        response => {
          this.dataSavedEmitter.emit(false);
          this.pending = false;
        }
      );
    } else {
      this.switch()
    }
  }

  pending = false;

  displayDialog: boolean = false;

  show() {
    this.displayDialog = true;
  }

  photoUploaded($event: any) {
    this.displayDialog = false;
    this.profile$ = this.profileService.profile$;
  }
}

