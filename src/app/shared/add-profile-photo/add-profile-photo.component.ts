import { UserService } from './../../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCard } from 'src/app/models/userCard';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-add-profile-photo',
  templateUrl: './add-profile-photo.component.html',
  styleUrls: ['./add-profile-photo.component.scss']
})
export class AddProfilePhotoComponent implements OnInit {

  constructor(private profileService: ProfileService, private userService: UserService) { }

  ngOnInit(): void {
  }

  @Output() photoUploadedEmitter = new EventEmitter<boolean>();
  @Output() hideDialogEmitter = new EventEmitter<boolean>();


  file: File = null;

  fileSelected($event: File) {
    this.file = $event;
  }

  addProfilePhoto() {
    if (this.file !== null) {
      const setProfile = {
        file: this.file
      }
      this.pending = true;
      this.profileService.setProfilePhoto(setProfile).subscribe(
        response => {
          this.pending = false;
          this.photoUploadedEmitter.emit(true);
          const userCard: UserCard = JSON.parse(localStorage.getItem("userCard"));
          this.userService.userSource.next(userCard);
        }, error => {
          this.pending = false;
        }
      )
        
    }
  }

  hideDialog() {
    this.hideDialogEmitter.emit(true)
  }

  pending: boolean = false;
}
