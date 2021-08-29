import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbBadgeModule, NbButtonModule, NbCardModule, NbChatModule, NbIconModule, NbListModule, NbUserModule, NbWindowModule } from '@nebular/theme';

import { SettingsMenuModule } from '@shared/settings-menu';
import { ChatRoutingModule } from './chat-routing.module';

import { ChatComponent } from './chat.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { ChatUserAreaComponent } from './components/chat-user-area/chat-user-area.component';
import { ChatStartNewChatComponent } from './components/chat-start-new-chat/chat-start-new-chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatConversationComponent,
    ChatUserAreaComponent,
    ChatStartNewChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbChatModule,
    NbListModule,
    NbCardModule,
    NbUserModule,
    NbBadgeModule,
    NbIconModule,
    NbButtonModule,
    NbWindowModule,
    SettingsMenuModule,
  ]
})
export class ChatModule { }
