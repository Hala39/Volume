import { PresenceService } from '../../services/presence.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faGrinAlt, faImage } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/appUser';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnDestroy {

  contentViewChild: any;

  constructor(private chatService: ChatService, private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder, public presenceService: PresenceService) {
    this.messages$ = this.chatService.thread$;
    this.user$ = this.userService.user$;
    console.log(this.chatService.threadSource.value)
  }

  @ViewChild('sc') private myScrollContainer: any;


    ngAfterViewChecked() {  
      this.scrollToBottom();      
    } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.scrollTop(1000)
    } catch(err) { }                 
}

  scrollTop(scrollTop: any) {
    let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
    scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
    this.contentViewChild.nativeElement.scrollTop = this.contentViewChild.nativeElement.scrollHeight;
    
  }
  
  ngOnInit(): void {
    this.getContact();
    this.build();
    this.scrollToBottom();        
  }

  ngOnDestroy() {
    this.chatService.stopHubConnection();
  }

  messages$: Observable<Message[]>;
  user$: Observable<AppUser>;

  faGrinAlt = faGrinAlt;
  faTimes = faTimes;
  faPaperClip = faPaperclip;
  faImage = faImage;

  @Input() contactId: string;
  contact: AppUser;

  form: FormGroup;
  message = new FormControl();

  build() {
    this.form = this.fb.group({
      message: this.message
    })
  }

  sendMessage() {
    if (this.message.value !== null) {
      this.chatService.addMessage(this.contactId, this.message.value, null, false).then(
        response => {
          this.form.reset();
        }
      )
    }
  }

  getContact() {
    this.profileService.getAppUser(this.contactId).subscribe(
      response => this.contact = response
    )
  }

  deleteMessage(id: number) {
    this.chatService.deleteMessage(id).subscribe();
  }


}
