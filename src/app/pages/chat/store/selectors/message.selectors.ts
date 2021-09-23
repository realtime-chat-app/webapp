import { createSelector } from '@ngrx/store';
import * as moment from 'moment';
import { ChatModuleState, _MessageState, _ChatState } from '../states';
import { selectChatModuleState } from './chat.selectors';

export const selectMessagesState = createSelector(selectChatModuleState, _selectMessagesState);

export const selectCurrentChatMessages = createSelector(
  selectChatModuleState,
  _selectChatMessages
);
export const selectMessagesByChatId = ({ id }: { id: string }) => createSelector(
  selectMessagesState,
  (state) => _selectChatMessagesByChatId(state, id)
);
export const selectMessagesUnreadCount = ({ chatId, userId }: { chatId: string, userId: string }) => createSelector(
  selectChatModuleState,
  (state) => _selectMessagesUnreadCount(state, chatId, userId)
);

function _selectChatMessages(state: ChatModuleState) {
  if (state.chats.currentChat) {
    const currChatId = state.chats.currentChat.id as string;
    return state.messages.entities[currChatId];
  }
  return [];
};

function _selectChatMessagesByChatId(state: _MessageState, chatId: string) {
  return state.entities[chatId];
};

function _selectMessagesUnreadCount(state: ChatModuleState, chatId: string, userId: string) {
  const chat = state.chats.entities[chatId];
  const messages = state.messages.entities[chatId];
  return messages.filter(m =>
    m.senderId != userId &&
    moment(m.createdAt).isAfter(moment(chat?.lastSeen?.updatedAt || chat?.lastSeen?.createdAt))
  ).length || 0;
};

function _selectMessagesState(state: ChatModuleState) {
  return state.messages;
};