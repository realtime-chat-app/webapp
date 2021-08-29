import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { SocketService } from "@shared/socket";
import { AuthService } from "@core/services";

import { Chat, Member, Message } from "@core/models";


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

  public newMessage$(): Observable<Message> {
    return this.socketService.fromEvent$(`new-message`);
  }
}