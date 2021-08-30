import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { ChatService } from '@pages/chat/chat.service';
import { AuthService } from '@core/services';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import {
  Chat,
  ChatDropFileEvent,
  Member,
  Message,
  SendChatMessageEvent,
  User,
} from '@core/models';

@Component({
  selector: 'chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.scss'],
})
export class ChatConversationComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chat: Chat | null = null;
  private unsubscribe$ = new Subject<boolean>();
  public messages: Message[] = [];
  public user: User;

  constructor(
    private authService: AuthService,
    private service: ChatService,
  ) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.onNewMessage();

  }

  ngOnChanges() {
    if (this.chat?.messages) {
      this.messages.push(...[...this.chat?.messages].reverse() as Message[]);
    } else {
      this.messages = [];
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public chatTitle(chat: Chat): Observable<string> {
    return of(chat)
      .pipe(
        map(() => {
          if (chat?.isGroup) return chat.title as string || '';

          let member = (chat?.members as Member[]).find(m => m.userId != this.user.id);
          if (member) {
            return (member.user as User).name;
          }

          return '';
        })
      );
  }

  public isReply$(message: Message): Observable<boolean> {
    return of(message)
      .pipe(map(m => {
        if ((m.senderId || m.user.id) === this.user?.id) {
          return true;
        }
        return false;
      }));
  }

  private onNewMessage(): void {
    this.service.newMessage$()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(newMessage => {
        this.messages.push(newMessage);
      });
  }

  sendMessage(event: SendChatMessageEvent) {
    const files = !event.files ? [] :
      (event.files as ChatDropFileEvent[])
        .map((file) => {
          return {
            url: file.src,
            type: file.type,
            icon: 'file-text-outline',
          };
        });

    const message = new Message({
      // latitude: -1054051,
      // longitude: 56159051,
      text: event.message,
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: this.user,
      quote: JSON.stringify({ text: 'vai nessa troxa' }),
      chatId: this.chat?.id,
    });

    // TODO: create ID from here and push messages to server. Await for creation response and display status in screen.
    // this.messages.push(message);
    this.service.emit('message', message);
  }
}