import { Message } from '@core/models';

export enum MESSAGE_ACTIONS {
  AddChatEntry = '[ChatEffects/Service] Add Chat Entry',
  LoadMessages = '[Message/Service] Load Messages',
  AddMessage = '[Message/Service] Add Message',
  SetMessage = '[Message/Service] Set Message',
  UpsertMessage = '[Message/Service] Upsert Message',
  AddMessages = '[Message/Service] Add Messages',
  UpsertMessages = '[Message/Service] Upsert Messages',
  UpdateMessage = '[Message/Service] Update Message',
  UpdateMessages = '[Message/Service] Update Messages',
  MapMessage = '[Message/Service] Map Message',
  MapMessages = '[Message/Service] Map Message',
  DeleteMessage = '[Message/Service] Delete Message',
  DeleteMessages = '[Message/Service] Delete Messages',
  DeleteMessageByPredicate = '[Message/Service] Delete Message By Predicate',
  ClearMessages = '[Message/Service] Clear Messages',
};

export interface _MessageState {
  loading: false,
  error: any,
  entities: {
    [x: string]: Message[];
  };
};

export interface MessageState {
  messages: _MessageState;
};

export const initialMessageState: _MessageState = {
  loading: false,
  error: null,
  entities: {},
};
