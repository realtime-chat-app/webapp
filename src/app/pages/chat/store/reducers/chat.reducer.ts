import { Action, createReducer, on } from '@ngrx/store';

import { initialChatState, chatAdapter, _ChatState } from '../states';
import * as ChatActions from '../actions/chat.actions';

const _chatReducer = createReducer(
  initialChatState,
  on(ChatActions.addChat, (state, { chat }) => {
    return chatAdapter.addOne(chat, state)
  }),
  on(ChatActions.setChat, (state, { chat }) => {
    return chatAdapter.setOne(chat, state)
  }),
  on(ChatActions.upsertChat, (state, { chat }) => {
    return chatAdapter.upsertOne(chat, state);
  }),
  on(ChatActions.addChats, (state, { chats }) => {
    return chatAdapter.addMany(chats, state);
  }),
  on(ChatActions.upsertChats, (state, { chats }) => {
    return chatAdapter.upsertMany(chats, state);
  }),
  on(ChatActions.updateChat, (state, { update }) => {
    return chatAdapter.updateOne(update, state);
  }),
  on(ChatActions.updateChats, (state, { updates }) => {
    return chatAdapter.updateMany(updates, state);
  }),
  on(ChatActions.mapChat, (state, { entityMap }) => {
    return chatAdapter.mapOne(entityMap, state);
  }),
  on(ChatActions.mapChats, (state, { entityMap }) => {
    return chatAdapter.map(entityMap, state);
  }),
  on(ChatActions.deleteChat, (state, { id }) => {
    return chatAdapter.removeOne(id, state);
  }),
  on(ChatActions.deleteChats, (state, { ids }) => {
    return chatAdapter.removeMany(ids, state);
  }),
  on(ChatActions.deleteChatsByPredicate, (state, { predicate }) => {
    return chatAdapter.removeMany(predicate, state);
  }),
  on(ChatActions.loadChats, (state, { chats }) => {
    return chatAdapter.setAll(chats, state);
  }),
  on(ChatActions.clearChats, state => {
    return chatAdapter.removeAll({ ...state });
  })
);

export function chatReducer(state: _ChatState | undefined, action: Action) {
  return _chatReducer(state, action);
}
