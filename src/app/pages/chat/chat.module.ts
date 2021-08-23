import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbChatModule } from '@nebular/theme';

import { ChatRoutingModule } from './chat-routing.module';

import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbChatModule,
  ]
})
export class ChatModule { }
