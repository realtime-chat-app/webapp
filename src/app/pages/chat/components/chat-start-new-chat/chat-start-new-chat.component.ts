import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { NbWindowRef, NbWindowService } from '@nebular/theme';

import { Observable } from 'rxjs';

import { AuthService, UserService } from '@core/services';
import { ChatService } from '@pages/chat/chat.service';

import { Chat, User } from '@core/models';

@Component({
  selector: 'chat-start-new-chat',
  templateUrl: './chat-start-new-chat.component.html',
  styleUrls: ['./chat-start-new-chat.component.scss']
})
export class ChatStartNewChatComponent {

  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @Input() chats: Chat[] = [];

  private modalRef!: NbWindowRef;
  public users$: Observable<User[]>;

  constructor(
    private windowService: NbWindowService,
    private authService: AuthService,
    private userService: UserService,
    private service: ChatService,
  ) {
    this.users$ = this.userService.GetUsers({ removeSelf: true });
  }

  public openNewChat() {
    this.modalRef = this.windowService.open(this.modalContent, {
      hasBackdrop: true,
      title: 'Nova Conversa',
      windowClass: 'start-new-chat-modal',
    });
  }

  public startChat(user: User): void {
    const chat = new Chat({
      userId: this.authService.currentUserValue.id,
      isGroup: false,
      members: [user.id],
    });

    this.service.emit(`chat:start-chat`, chat);
    this.modalRef?.close();
  }
}
