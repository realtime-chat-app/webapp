import { Component, Input } from '@angular/core';

import { Chat } from '@core/models';

@Component({
  selector: 'chat-list-unread-count',
  templateUrl: './chat-list-unread-count.component.html',
  styleUrls: ['./chat-list-unread-count.component.scss']
})
export class ChatListUnreadCountComponent {

  @Input() chat: Chat | null = null;
  @Input() unreadCount: number | null = 0;
}
