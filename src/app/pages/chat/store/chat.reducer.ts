import { Action, createReducer, on } from '@ngrx/store';

import { initialChatState, adapter, State } from './chat.state';
import * as ChatActions from './chat.actions';

const _chatReducer = createReducer(
  initialChatState,
  on(ChatActions.addChat, (state, { chat }) => {
    return adapter.addOne(chat, state)
  }),
  on(ChatActions.setChat, (state, { chat }) => {
    return adapter.setOne(chat, state)
  }),
  on(ChatActions.upsertChat, (state, { chat }) => {
    return adapter.upsertOne(chat, state);
  }),
  on(ChatActions.addChats, (state, { chats }) => {
    return adapter.addMany(chats, state);
  }),
  on(ChatActions.upsertChats, (state, { chats }) => {
    return adapter.upsertMany(chats, state);
  }),
  on(ChatActions.updateChat, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(ChatActions.updateChats, (state, { updates }) => {
    return adapter.updateMany(updates, state);
  }),
  on(ChatActions.mapChat, (state, { entityMap }) => {
    return adapter.mapOne(entityMap, state);
  }),
  on(ChatActions.mapChats, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(ChatActions.deleteChat, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ChatActions.deleteChats, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ChatActions.deleteChatsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(ChatActions.loadChats, (state, { chats }) => {
    return adapter.setAll(chats, state);
  }),
  on(ChatActions.clearChats, state => {
    return adapter.removeAll({ ...state });
  })
);

export function chatReducer(state: State | undefined, action: Action) {
  return _chatReducer(state, action);
}
