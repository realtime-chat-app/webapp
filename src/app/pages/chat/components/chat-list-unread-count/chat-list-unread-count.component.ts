import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { ChatService } from '@pages/chat/chat.service';
import { AuthService } from '@core/services';

import { Chat, LastSeen, Message } from '@core/models';

@Component({
  selector: 'chat-list-unread-count',
  templateUrl: './chat-list-unread-count.component.html',
  styleUrls: ['./chat-list-unread-count.component.scss']
})
export class ChatListUnreadCountComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chat: Chat | null = null;
  private _chat$ = new BehaviorSubject<Chat>(null!);
  private unsubscribe$ = new Subject<boolean>();
  public chat$: Observable<Chat>;
  public lastSeen: LastSeen | null = null;

  constructor(private service: ChatService, private authService: AuthService) {
    this.chat$ = this._chat$.asObservable();
  }

  ngOnInit(): void {
    this.onLastSeenCreated();
    this.onLastSeenUpdated();
  }

  ngOnChanges() {
    if (this.chat) {
      this._chat$.next(this.chat);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public getUnreadCount$(): Observable<number> {
    return this._chat$.asObservable()
      .pipe(
        filter(v => (v != null && v != undefined)),
        map(chat => {
          let lastSeen = this.lastSeen || chat.lastSeen;
          if (lastSeen) {
            return (chat.messages as Message[]).filter(m =>
              m.senderId != this.authService.currentUserValue.id &&
              moment(m.createdAt).isAfter(moment(lastSeen?.updatedAt))
            ).length || 0;
          } else {
            return chat.messages?.length || 0;
          }
        })
      );
  }

  private onLastSeenCreated() {
    this.service.lastSeenCreated$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lastSeen => {
        if (this.chat?.id === lastSeen.chatId) {
          this.lastSeen = lastSeen;
        }
      });
  }

  private onLastSeenUpdated() {
    this.service.lastSeenUpdated$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lastSeen => {
        if (this.chat?.id === lastSeen.chatId) {
          this.lastSeen = lastSeen;
          console.log(this.chat);
        }
      });
  }
}
