import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';

import { SettingsMenuModule } from '@shared/settings-menu';
import { ChatRoutingModule } from './chat-routing.module';
import { ButtonsModule } from '@shared/buttons';

import {
  ChatListUnreadCountComponent,
  ChatStartNewChatComponent,
  ChatConversationComponent,
  ChatUserAreaComponent,
  ChatListComponent,
} from './components';
import { ChatComponent } from './chat.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatConversationComponent,
    ChatUserAreaComponent,
    ChatStartNewChatComponent,
    ChatListUnreadCountComponent
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
    NbCheckboxModule,
    NbContextMenuModule,
    SettingsMenuModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
  ]
})
export class ChatModule { }
