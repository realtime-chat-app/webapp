import { Component, Input, OnInit } from '@angular/core';

import { Chat } from '@core/models';

@Component({
  selector: 'chat-list-unread-count',
  templateUrl: './chat-list-unread-count.component.html',
  styleUrls: ['./chat-list-unread-count.component.scss']
})
export class ChatListUnreadCountComponent implements OnInit {

  @Input() chat: Chat | null = null;
  public count = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
