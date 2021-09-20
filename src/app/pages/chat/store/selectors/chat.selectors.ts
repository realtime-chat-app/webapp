import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatModuleState, chatAdapter, _ChatState } from '../states';
import { FEATURES } from '@store/features';
import { Chat } from '@core/models';

const {
  selectEntities: _selectChatEntities,
  selectTotal: _selectChatTotal,
  selectAll: _selectAllChats,
  selectIds: _selectChatIds,
} = chatAdapter.getSelectors();
const _getCurrentChatId = (state: _ChatState) => (state.currentChat as Chat)?.id;
const _getCurrentChat = (state: _ChatState) => (state.currentChat as Chat);

export const selectChatModuleState = createFeatureSelector<ChatModuleState>(FEATURES.chatModule);
export const selectChatState = createSelector(selectChatModuleState, _selectChatState);

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
  selectChatState,
  _getCurrentChat,
);

function _selectChatState(state: ChatModuleState) {
  return state.chats
};