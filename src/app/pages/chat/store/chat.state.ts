import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';

import { Chat } from '@core/models';
import { FEATURES } from '@store/features';

export enum CHAT_ACTIONS {
  LoadChat = '[Chat/Service] Load Chats',
  AddChat = '[Chat/Service] Add Chat',
  SetChat = '[Chat/Service] Set Chat',
  UpsertChat = '[Chat/Service] Upsert Chat',
  AddChats = '[Chat/Service] Add Chats',
  UpsertChats = '[Chat/Service] Upsert Chats',
  UpdateChat = '[Chat/Service] Update Chat',
  UpdateChats = '[Chat/Service] Update Chats',
  MapChat = '[Chat/Service] Map Chat',
  MapChats = '[Chat/Service] Map Chat',
  DeleteChat = '[Chat/Service] Delete Chat',
  DeleteChats = '[Chat/Service] Delete Chats',
  DeleteChatByPredicate = '[Chat/Service] Delete Chat By Predicate',
  ClearChats = '[Chat/Service] Clear Chats',
};

export interface State extends EntityState<Chat> {
  loading: false,
  error: any,
  currentChat: any,
};

export interface ChatState {
  chats: State;
};

export const adapter: EntityAdapter<Chat> = createEntityAdapter<Chat>({
  sortComparer: sortByLastMessageTimestamp,
});

export const initialChatState: State = adapter.getInitialState({
  loading: false,
  error: null,
  currentChat: null,
});

export function sortByLastMessageTimestamp(a: Chat, b: Chat): number {
  let aCreatedAt = a.createdAt as Date;
  let bCreatedAt = b.createdAt as Date;
  if (a.messages && b.messages) {
    if (a.messages.length > 0) aCreatedAt = a.messages[0].createdAt as Date;
    if (b.messages.length > 0) bCreatedAt = b.messages[0].createdAt as Date;
  }
  else if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1;
  if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1;
  return 0;
}