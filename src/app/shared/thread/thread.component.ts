import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PresenceService } from '../../services/presence.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,  OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { faGrinAlt } from '@fortawesome/free-regular-svg-icons';
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
    private profileService: ProfileService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, public presenceService: PresenceService, private cdr: ChangeDetectorRef) {
    this.messages$ = this.chatService.thread$;
    this.user$ = this.userService.user$;
  }
  
  ngOnInit(): void {
    this.getContactId();
    this.chatService.createHubConnection(this.contactId);   
    this.getContact();
    this.build();
  }

  ngOnDestroy() {
    this.chatService.stopHubConnection();
  }

  getContactId() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.contactId = queryParams.contactId,
      this.previousPage = queryParams.previous
    })
  }
  
  
  loadMode: boolean = false;
  seen = faCheckDouble;
  sent = faCheck;
  isTyping$: Observable<boolean>;

  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  ngAfterViewChecked() {  
    this.cdr.detectChanges();
  } 
  
  contentViewChild: any;
  public scrollContainer: any;
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

  messages$: Observable<Message[]>;
  user$: Observable<AppUser>;

  faGrinAlt = faGrinAlt;
  faTimes = faTimes;

  contactId: string;
  contact: AppUser;
  previousPage: string;

  form: FormGroup;
  message = new FormControl();

  build() {
    this.form = this.fb.group({
      message: this.message
    })
  } 

  back() {
    this.router.navigateByUrl(this.previousPage)
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


}
