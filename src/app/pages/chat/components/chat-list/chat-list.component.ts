import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { ChatService } from '@pages/chat/chat.service';
import { AuthService } from '@core/services';

import { Chat, Member, User } from '@core/models';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnInit, OnDestroy {

  @Input() chats: Chat[] = [];
  @Output() chatSelected = new EventEmitter<Chat>();
  private unsubscribe$ = new Subject<boolean>();
  public user: User;

  constructor(private authService: AuthService, private service: ChatService) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.onNewMessage();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public openChat(chat: Chat) {
    this.chatSelected.emit(chat);
  }

  public getChatName(chat: Chat): Observable<string> {
    return of(chat.members)
      .pipe(
        map(members => {
          if (chat.title) return chat.title;

          let member = (members as Member[]).find(m => m.userId != this.user.id);
          if (member) {
            return (member.user as User).name;
          }

          return '';
        })
      );
  }

  public lastChatMessage(chat: Chat): Observable<string> {
    return of(chat.messages)
      .pipe(
        map(messages => {
          if (messages && messages.length > 0) return messages[0].text as string;
          return '';
        })
      );
  }

  public getChatPicture(chat: Chat): Observable<string> {
    return of(chat)
      .pipe(
        map(() => {
          let defaultImage = 'assets/img/noimage.png';
          if (chat.isGroup && chat.picture) {
            return chat.picture as string;
          }

          let member = (chat.members as Member[]).find(m => m.userId != this.user.id);
          if (member && member.user?.avatar) {
            return (member.user as User).avatar as string;
          }

          return defaultImage;
        })
      );
  }

  private onNewMessage(): void {
    this.service.newMessage$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(newMessage => {
        const chatIdx = this.chats.findIndex(c => c.id == newMessage.chatId);
        this.chats[chatIdx]?.messages?.splice(0, 0, newMessage);
      });
  }
}
