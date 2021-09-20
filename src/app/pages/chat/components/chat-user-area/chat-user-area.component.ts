import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@core/services';

import { Chat, User } from '@core/models';

@Component({
  selector: 'chat-user-area',
  templateUrl: './chat-user-area.component.html',
  styleUrls: ['./chat-user-area.component.scss']
})
export class ChatUserAreaComponent {

  @Input() chats: Chat[] = [];

  public user$: Observable<User>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }
}
