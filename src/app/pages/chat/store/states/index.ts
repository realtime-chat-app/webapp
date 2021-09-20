import { _ChatState, _MessageState } from '../states';

export * from './message.state';
export * from './chat.state';

export interface ChatModuleState {
  chats: _ChatState,
  messages: _MessageState,
};
