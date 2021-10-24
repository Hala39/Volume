import { MenuItem } from 'primeng/api';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-popup',
  templateUrl: './chat-popup.component.html',
  styleUrls: ['./chat-popup.component.scss']
})
export class ChatPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() listStyle = { 'height': '600px'};
  @Input() title: string = 'Active Contacts';
  @Input() popupClass = "col-3 col-sm-3 pb-0";
  @Input() containerClass = "fixed-bottom pr-5 pl-1 mr-5";
  @Input() chatsExpanded: boolean = false;
  @Input() fullScreen: boolean = false;
  @Output() expandChatRoomEmitter = new EventEmitter<boolean>();

  expandChats() {
    this.chatsExpanded = !this.chatsExpanded;
  }

  expandChatRoom($event: boolean) {
    this.expandChatRoomEmitter.emit($event);
  }

  items: MenuItem[] = [{
    label: 'Options',
    items: [{
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    }
    ]},
    {
      label: 'Navigate',
      items: [{
          label: 'Angular Website',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
      },
      {
          label: 'Router',
          icon: 'pi pi-upload'
      }
    ]}
  ];

}

