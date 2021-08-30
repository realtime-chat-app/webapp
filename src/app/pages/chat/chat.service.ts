import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { SocketService } from "@shared/socket";
import { AuthService } from "@core/services";

import { Chat, LastSeen, Member, Message } from "@core/models";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
  ) { }

  public emit(eventName: string, payload: any) {
    return this.socketService.emit(eventName, payload);
  }

  public initialChats$(): Observable<Chat[]> {
    return this.socketService.fromEvent$('chats');
  }

  public chatMembers$(chat: Chat): Observable<Member[]> {
    return this.socketService.fromEvent$(`chat?id=${chat.id}:get-members`);
  }

  public newChats$(): Observable<Chat> {
    return this.socketService.fromEvent$(`chat:new-chat`);
  }

  public lastSeenCreated$(): Observable<LastSeen> {
    return this.socketService.fromEvent$(`last-seen-created`);
  }

  public lastSeenUpdated$(): Observable<LastSeen> {
    return this.socketService.fromEvent$(`last-seen-updated`);
  }

  public newMessage$(): Observable<Message> {
    return this.socketService.fromEvent$(`new-message`);
  }

  public updateLastSeen(chat: Chat) {
    if (chat) {
      let event, lastSeen;
      if (chat.lastSeen) {
        event = 'chat:update-last-seen';
        lastSeen = new LastSeen({
          ...chat.lastSeen as LastSeen,
        });
      } else {
        event = 'chat:create-last-seen';
        lastSeen = {
          userId: this.authService.currentUserValue.id as string,
          chatId: chat.id as string,
        };
      }

      this.emit(event, lastSeen);
    }
  }
}