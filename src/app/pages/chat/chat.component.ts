import { Component, OnDestroy, OnInit } from '@angular/core';

import { take, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '@core/services';
import { ChatService } from './chat.service';

import { selectAllChats, selectCurrentChat } from './store/selectors/chat.selectors';
import { loadChats, addChat, setCurrentChat } from './store/actions/chat.actions';
import { loadMessages } from './store/actions/message.actions';
import { ChatState } from './store/states';

import { Chat } from '@core/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<boolean>();
  public currentChat$: Observable<Chat>;
  public chats$: Observable<Chat[]>;

  constructor(
    private authService: AuthService,
    private store: Store<ChatState>,
    private service: ChatService,
  ) {
    this.chats$ = this.store.select(selectAllChats);
    this.currentChat$ = this.store.select(selectCurrentChat);
  }

  ngOnInit() {
    this.getInitialChats();
    this.newChatStarted();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public changeSelectedChat(chat: Chat) {
    this.store.dispatch(setCurrentChat({ chat }));
  }

  private getInitialChats() {
    return this.service.initialChats$()
      .pipe(take(1))
      .subscribe(chats => {
        this.store.dispatch(loadChats({ chats }));
        this.store.dispatch(loadMessages({ chats }));
      });
  }

  private newChatStarted() {
    this.service.newChats$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(chat => {
        this.store.dispatch(addChat({ chat }));

        if (chat.userId === this.authService.currentUserValue.id) {
          this.changeSelectedChat(chat);
        }
      });
  }
}
