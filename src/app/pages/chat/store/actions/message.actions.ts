import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { MESSAGE_ACTIONS } from '../states';
import { Chat, Message } from '@core/models';

export const loadMessages = createAction(MESSAGE_ACTIONS.LoadMessages, props<{ chats: Chat[] }>());
export const addMessage = createAction(MESSAGE_ACTIONS.AddMessage, props<{ message: Message }>());
export const setMessage = createAction(MESSAGE_ACTIONS.SetMessage, props<{ message: Message }>());
export const upsertMessage = createAction(MESSAGE_ACTIONS.UpsertMessage, props<{ message: Message }>());
export const addMessages = createAction(MESSAGE_ACTIONS.AddMessages, props<{ messages: Message[] }>());
export const upsertMessages = createAction(MESSAGE_ACTIONS.UpsertMessages, props<{ messages: Message[] }>());
export const updateMessage = createAction(MESSAGE_ACTIONS.UpdateMessage, props<{ update: Update<Message> }>());
export const updateMessages = createAction(MESSAGE_ACTIONS.UpdateMessages, props<{ updates: Update<Message>[] }>());
export const mapMessage = createAction(MESSAGE_ACTIONS.MapMessage, props<{ entityMap: EntityMapOne<Message> }>());
export const mapMessages = createAction(MESSAGE_ACTIONS.MapMessages, props<{ entityMap: EntityMap<Message> }>());
export const deleteMessage = createAction(MESSAGE_ACTIONS.DeleteMessage, props<{ id: string }>());
export const deleteMessages = createAction(MESSAGE_ACTIONS.DeleteMessages, props<{ ids: string[] }>());
export const deleteMessagesByPredicate = createAction(MESSAGE_ACTIONS.DeleteMessageByPredicate, props<{ predicate: Predicate<Message> }>());
export const clearMessages = createAction(MESSAGE_ACTIONS.ClearMessages);
