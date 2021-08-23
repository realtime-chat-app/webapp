import { Component, OnInit } from '@angular/core';

import { SocketService } from '@shared/socket';
import { ChatService } from './chat.service';

import { ChatDropFileEvent, Message, SendChatMessageEvent } from '@core/models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public messages: Message[];

  constructor(
    private socketService: SocketService,
    private service: ChatService,
  ) {
    this.messages = [...this.service.fakeMessages()];
  }

  ngOnInit(): void {
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

    this.messages.push({
      latitude: -1054051,
      longitude: 56159051,
      text: event.message,
      createdAt: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
        email: 'algum@algum.com',
        id: 'askdo1-aosdk'
      },
      quote: 'Alguma mensagem quote aqui',
    });
    // const botReply = this.chatShowcaseService.reply(event.message);
    // if (botReply) {
    //   setTimeout(() => { this.messages.push(botReply) }, 500);
    // }
  }
}
