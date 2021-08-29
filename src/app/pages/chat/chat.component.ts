import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { AuthService } from '@core/services';
import { ChatService } from './chat.service';

import { Chat } from '@core/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<boolean>();
  public _chats$ = new BehaviorSubject<Chat[]>([]);
  public chats$: Observable<Chat[]>;
  public currentChat$ = new BehaviorSubject<Chat>(null!);

  constructor(
    private authService: AuthService,
    private service: ChatService,
  ) {
    this.chats$ = this._chats$.asObservable()
      .pipe(
        map(chats => {
          return chats.sort((a, b) => {
            const aDate = a.createdAt?.toString() as string;
            const bDate = b.createdAt?.toString() as string;
            return aDate.localeCompare(bDate.toString());
          });
        })
      );
  }

  ngOnInit() {
    this.getInitialChats();
    this.newChatStarted();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public chatSelected(chat: Chat) {
    this.currentChat$.next(chat);
  }

  private addNewChatsToCache(chats: Chat[]) {
    console.log(chats);

    const currentChats = this._chats$.value;
    this._chats$.next([...chats, ...currentChats]);
  }

  private getInitialChats() {
    return this.service.initialChats$()
      .pipe(take(1))
      .subscribe(chats => this.addNewChatsToCache(chats));
  }

  private newChatStarted() {
    this.service.newChats$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(chat => {
        this.addNewChatsToCache([chat]);

        if (chat.userId === this.authService.currentUserValue.id) {
          this.currentChat$.next(chat);
        }
      });
  }
}
