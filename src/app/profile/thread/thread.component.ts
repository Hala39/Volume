import { PresenceService } from '../../services/presence.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faGrinAlt, faImage } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/appUser';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  providers: [DatePipe]
})
export class ThreadComponent implements OnInit, OnDestroy {

  contentViewChild: any;

  constructor(private chatService: ChatService, private userService: UserService,
    private profileService: ProfileService, private DatePipe: DatePipe,
    private fb: FormBuilder, public presenceService: PresenceService, private cdr: ChangeDetectorRef) {
    this.messages$ = this.chatService.thread$;
    this.user$ = this.userService.user$;
  }

  @ViewChild('sc') private myScrollContainer: any;


    ngAfterViewChecked() {  
      this.cdr.detectChanges();
      this.scrollToBottom();   
    } 

  scrollToBottom(): void {
    try {
      this.myScrollContainer.scrollTop(10000)
    } catch(err) { }                 
}

  scrollTop(scrollTop: any) {
    this.contentViewChild.nativeElement.scrollTop = scrollTop;
    
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
      this.chatService.addMessage(this.contactId, this.message.value).then(
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

  emojiExpanded: boolean = false;

  expandEmoji() {
    this.emojiExpanded = true;
  }

  hideEmoji() {
    this.emojiExpanded = false;
  }

  select($event: EmojiData) {
    let data = this.form.get('message').value;
    if (!data)  data = '';
    this.form.patchValue({"message": data + $event.native});
  }

  items: MenuItem[] = [
    { label: 'Delete', icon: PrimeIcons.TRASH, command: () => {
      this.deleteMessage(this.selectedMessage.id);
    }},
    { label: 'info', icon: PrimeIcons.INFO_CIRCLE, command: () => {
      this.items[1].items[0].label = 'Seen @' + this.DatePipe.transform(this.selectedMessage.seenAt, 'shortTime'),
      this.items[1].items[1].label = 'Sent @' + this.DatePipe.transform(this.selectedMessage.sentAt, 'shortTime')
    },
      items: [
        {label: ''},
        {label: ''}
      ]
    }
  ] 


  @ViewChild('menu') menu: any;

  selectedMessage: Message;

  selectMessage($event: any, message: Message) {
    this.menu.show($event);
    this.selectedMessage = message;

  }

  pageNumber = 2;
  onScroll(e: any) {
    // this.chatService.createHubConnection(this.contactId, this.pageNumber++, true);
    console.log("hi")
  }

}
