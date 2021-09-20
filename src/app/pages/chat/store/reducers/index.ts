import { ActionReducerMap } from '@ngrx/store';

import { messageReducer } from './message.reducer';
import { chatReducer } from './chat.reducer';
import { ChatModuleState } from '../states';

export const reducers: ActionReducerMap<ChatModuleState> = {
  chats: chatReducer,
  messages: messageReducer,
};
