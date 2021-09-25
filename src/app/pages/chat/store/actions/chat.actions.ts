import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { CHAT_ACTIONS } from '../states';
import { Chat } from '@core/models';

export const setCurrentChat = createAction(CHAT_ACTIONS.SetCurrentChat, props<{ chat: Chat | null }>());
export const removeCurrentChat = createAction(CHAT_ACTIONS.RemoveCurrentChat, props<{ chat: Chat }>());
export const loadChats = createAction(CHAT_ACTIONS.LoadChat, props<{ chats: Chat[] }>());
export const addChat = createAction(CHAT_ACTIONS.AddChat, props<{ chat: Chat }>());
export const setChat = createAction(CHAT_ACTIONS.SetChat, props<{ chat: Chat }>());
export const upsertChat = createAction(CHAT_ACTIONS.UpsertChat, props<{ chat: Chat }>());
export const addChats = createAction(CHAT_ACTIONS.AddChats, props<{ chats: Chat[] }>());
export const upsertChats = createAction(CHAT_ACTIONS.UpsertChats, props<{ chats: Chat[] }>());
export const updateChat = createAction(CHAT_ACTIONS.UpdateChat, props<{ update: Update<Chat> }>());
export const updateChats = createAction(CHAT_ACTIONS.UpdateChats, props<{ updates: Update<Chat>[] }>());
export const mapChat = createAction(CHAT_ACTIONS.MapChat, props<{ entityMap: EntityMapOne<Chat> }>());
export const mapChats = createAction(CHAT_ACTIONS.MapChats, props<{ entityMap: EntityMap<Chat> }>());
export const deleteChat = createAction(CHAT_ACTIONS.DeleteChat, props<{ id: string }>());
export const deleteChats = createAction(CHAT_ACTIONS.DeleteChats, props<{ ids: string[] }>());
export const deleteChatsByPredicate = createAction(CHAT_ACTIONS.DeleteChatByPredicate, props<{ predicate: Predicate<Chat> }>());
export const clearChats = createAction(CHAT_ACTIONS.ClearChats);
