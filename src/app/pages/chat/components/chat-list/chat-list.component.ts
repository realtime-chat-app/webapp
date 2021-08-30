import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { map, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import * as moment from 'moment';

import { ChatService } from '@pages/chat/chat.service';
import { AuthService } from '@core/services';

import { Chat, Member, User } from '@core/models';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chats: Chat[] = [];
  @Output() chatSelected = new EventEmitter<Chat>();
  private unsubscribe$ = new Subject<boolean>();
  private _chats$ = new BehaviorSubject<Chat[]>([]);
  public chats$: Observable<Chat[]>;
  public user: User;

  constructor(private authService: AuthService, private service: ChatService) {
    this.user = this.authService.currentUserValue;
    this.chats$ = this.getChats$();
  }

  ngOnInit() {
    this.onNewMessage();
  }

  ngOnChanges() {
    if (this.chats) this._chats$.next(this.chats);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public openChat(chat: Chat) {
    this.chats.map(c => {
      if (c.isActive) c.isActive = false;
    });
    chat.isActive = true;
    this.service.updateLastSeen(chat);
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

  public lastChatMessageDate(chat: Chat): Observable<string> {
    return of(chat.messages)
      .pipe(
        map(messages => {
          if (messages && messages.length > 0) return (messages[0].createdAt as Date);
          else if (messages && messages.length === 0) return chat.createdAt as Date;
          return new Date();
        }),
        map(date => {
          const today = moment().startOf('day');
          const currentYear = moment().startOf('year');
          const createdAt = moment(date);
          if (createdAt.isBefore(today)) {
            if (createdAt.isBefore(currentYear)) return createdAt.format('DD/MM/YY HH:mm');
            else return createdAt.format('DD/MM HH:mm');
          }
          else return createdAt.format('HH:mm');
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

  private getChats$(): Observable<Chat[]> {
    return this._chats$.asObservable()
      .pipe(map(chats => this.sortChats(chats)));
  }

  private sortChats(chats: Chat[]): Chat[] {
    return chats.sort((a: Chat, b: Chat) => {
      let aCreatedAt = a.createdAt as Date;
      let bCreatedAt = b.createdAt as Date;
      if (a.messages && b.messages) {
        if (a.messages.length > 0) aCreatedAt = a.messages[0].createdAt as Date;
        if (b.messages.length > 0) bCreatedAt = b.messages[0].createdAt as Date;
      }
      else if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1;
      if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1;
      return 0;
    });
  }

  private onNewMessage(): void {
    this.service.newMessage$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(newMessage => {
        const chatIdx = this.chats.findIndex(c => c.id == newMessage.chatId);
        this.chats[chatIdx]?.messages?.splice(0, 0, newMessage);
        this._chats$.next(this.chats);
      });
  }
}
