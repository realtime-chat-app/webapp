import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { ChatService } from '@pages/chat/chat.service';
import { AuthService } from '@core/services';

import { selectMessagesByChatId, selectMessagesUnreadCount, updateChat } from '@pages/chat/store';
import { addMessage } from '../../store/actions/message.actions';
import { MessageState, ChatState } from '../../store/states';

import { Chat, Member, Message, User } from '@core/models';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chats: Chat[] = [];
  @Input() currentChat: Chat | null = null;
  @Output() chatSelected = new EventEmitter<Chat>();
  private unsubscribe$ = new Subject<boolean>();
  private _chats$ = new BehaviorSubject<Chat[]>([]);
  public chats$: Observable<Chat[]>;
  public user: User;

  constructor(
    private authService: AuthService,
    private service: ChatService,
    private msgStore: Store<MessageState>,
    private store: Store<ChatState>,
  ) {
    this.user = this.authService.currentUserValue;
    this.chats$ = this.getChats$();
  }

  ngOnInit() {
    this.onLastSeenCreated();
    this.onLastSeenUpdated();
    this.onNewMessage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chats?.currentValue !== changes.chats?.previousValue) this._chats$.next(this.chats as Chat[]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public openChat(chat: Chat) {
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

  public lastSeen(chat: Chat): Observable<{ text: string; date: string }> {
    return this.getChatMessages(chat.id as string)
      .pipe(
        map(messages => {
          const response = { text: '', date: '' };
          if (messages && messages.length > 0) {
            response.text = messages[0].text as string;
            response.date = messages[0].createdAt as string;
          } else {
            response.date = new Date().toISOString();
          }

          const today = moment().startOf('day');
          const currentYear = moment().startOf('year');
          const createdAt = moment(response.date);
          if (createdAt.isBefore(today)) {
            if (createdAt.isBefore(currentYear)) response.date = createdAt.format('DD/MM/YY HH:mm');
            else response.date = createdAt.format('DD/MM HH:mm');
          } else {
            response.date = createdAt.format('HH:mm');
          }

          return response;
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

  public getMessagesUnreadCount(chat: Chat): Observable<number> {
    const chatId = chat.id as string;
    const userId = this.user.id as string;
    return this.msgStore.select(selectMessagesUnreadCount({ chatId, userId }));
  }

  private getChatMessages(id: string): Observable<Message[]> {
    return this.msgStore.select(selectMessagesByChatId({ id }));
  }

  private getChats$(): Observable<Chat[]> {
    return this._chats$.asObservable()
      .pipe(map(chats => this.sortChats(chats)));
  }

  private onLastSeenCreated() {
    this.service.lastSeenCreated$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lastSeen => this.store.dispatch(
        updateChat({
          update: {
            id: lastSeen.chatId,
            changes: { lastSeen },
          }
        }))
      );
  }

  private onLastSeenUpdated() {
    this.service.lastSeenUpdated$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lastSeen => this.store.dispatch(
        updateChat({
          update: {
            id: lastSeen.chatId,
            changes: { lastSeen },
          }
        }))
      );
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
      .subscribe(message => this.msgStore.dispatch(addMessage({ message })));
  }
}
