import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, State } from './chat.state';
import { FEATURES } from '@store/features';

const {
  selectEntities: _selectChatEntities,
  selectTotal: _selectChatTotal,
  selectAll: _selectAllChats,
  selectIds: _selectChatIds,
} = adapter.getSelectors();
const _getCurrentChatId = (state: State) => state.currentChat;

export const selectChatState = createFeatureSelector<State>(FEATURES.chat);

export const selectChatIds = createSelector(
  selectChatState,
  _selectChatIds
);
export const selectChatEntities = createSelector(
  selectChatState,
  _selectChatEntities
);
export const selectAllChats = createSelector(
  selectChatState,
  _selectAllChats
);
export const selectChatTotal = createSelector(
  selectChatState,
  _selectChatTotal
);
export const selectCurrentChatId = createSelector(
  selectChatState,
  _getCurrentChatId
);
export const selectCurrentChat = createSelector(
  selectChatEntities,
  selectCurrentChatId,
  (chatEntities, chatId) => chatEntities[chatId]
);