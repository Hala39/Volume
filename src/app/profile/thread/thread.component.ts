import { Guid } from 'guid-typescript';
import { PresenceService } from '../../services/presence.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faCheckCircle, faGrinAlt, faImage } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle as farCheckCircle} from '@fortawesome/free-regular-svg-icons';
import { faCheck, faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/appUser';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  providers: [DatePipe]
})
export class ThreadComponent implements OnInit, OnDestroy {
  constructor(private chatService: ChatService, private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder, public presenceService: PresenceService, private cdr: ChangeDetectorRef) {
    this.messages$ = this.chatService.thread$;
    this.user$ = this.userService.user$;
  }
  
  loadMode: boolean = false;
  seen = faCheckDouble;
  sent = faCheck;

  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  ngAfterViewChecked() {  
    this.cdr.detectChanges();
  } 
  
  contentViewChild: any;
  private scrollContainer: any;
  private isNearBottom = true;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());  
  }
  
  private onItemElementsChanged(): void {
    if (this.isNearBottom && !this.loadMode) {
      this.scrollToBottom();
    }
  }

  scrollTop(scrollTop: any) {
    this.contentViewChild.nativeElement.scrollTop = scrollTop;
  }

  scrollToBottom() {
    this.scrollContainer.scrollTop(30000);
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }
  
  
  ngOnInit(): void {
    this.getContact();
    this.build();
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
          this.loadMode = false;
        }
      )
    }
  }

  getContact() {
    this.profileService.getAppUser(this.contactId).subscribe(
      response => this.contact = response
    )
  }

  deleteMessage(id: Guid) {
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
    }}
  ] 

  item: MenuItem[] = [
    {
      label: 'Clear chat', icon: PrimeIcons.TRASH, command: () => {
        this.chatService.clearChat(this.contactId).subscribe();
      }
    }
  ]


  @ViewChild('menu') menu: any;

  selectedMessage: Message;

  selectMessage($event: any, message: Message) {
    this.menu.show($event);
    this.selectedMessage = message;

  }

  noMoreMessages = false;
  pageNumber = 2;
  loadMore() {
    this.loadMode = true;
    this.chatService.getMessageThread(this.contactId, this.pageNumber++, true).subscribe(
      response => {
        if (this.chatService.paginatedThreadResult.pagination.currentPage 
          === this.chatService.paginatedThreadResult.pagination.totalPages) {
          this.noMoreMessages = true;
        }
      }
    )
  }

  timeout: any = null;

  onType(event: any) {
    clearTimeout(this.timeout);
    console.log("typing")
    // this.chatService.IsContactTyping(true, this.contactId);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.executeListing(event.target.value);
      }
    }, 3000);
  }

  private executeListing(value: string) {
    console.log("stop")

    // this.chatService.IsContactTyping(false, this.contactId);
  }
}
