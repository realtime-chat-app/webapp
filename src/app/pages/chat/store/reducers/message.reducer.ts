import { Action, createReducer, on } from '@ngrx/store';
import * as moment from 'moment';

import { initialMessageState, _MessageState } from '../states/message.state';
import * as MessageActions from '../actions/message.actions';
import { Chat, Message } from '@core/models';

const _messageReducer = createReducer(
  initialMessageState,
  on(MessageActions.loadMessages, (state, { chats }) => {
    return loadMessages(chats, state)
  }),
  on(MessageActions.addMessage, (state, { message }) => {
    return addOne(message, state)
  }),
  on(MessageActions.addMessages, (state, { messages }) => {
    return addMany(messages, state);
  }),
);

export function messageReducer(state: _MessageState | undefined, action: Action) {
  return _messageReducer(state, action);
}

function loadMessages(chats: Chat[], state: _MessageState): _MessageState {
  const payload = parseInitialEntities(chats);
  return { ...state, entities: payload };
}

function addOne(message: Message, state: _MessageState): _MessageState {
  const newEntities: { [x: string]: Message[] } = JSON.parse(JSON.stringify(state.entities));
  newEntities[message.chatId as string].push(message);
  newEntities[message.chatId as string].sort(sortByLastMessageTimestamp);
  return { ...state, entities: newEntities };
}

function addMany(messages: Message[], state: _MessageState): _MessageState {
  const newEntities: { [x: string]: Message[] } = JSON.parse(JSON.stringify(state.entities));
  newEntities[messages[0].chatId as string].push(...messages);
  newEntities[messages[0].chatId as string].sort(sortByLastMessageTimestamp);
  return { ...state, entities: newEntities };
}

function sortByLastMessageTimestamp(a: Message, b: Message): number {
  let aCreatedAt = a.createdAt as Date;
  let bCreatedAt = b.createdAt as Date;

  if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1;
  if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1;
  return 0;
}

function parseInitialEntities(payload: Chat[], initialValue = {}): {
  [x: string]: Message[];
} {
  return [...payload].map(currItem => {
    return { [`${currItem.id}`]: currItem.messages as Message[] };
  })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    },
      initialValue
    );
}
