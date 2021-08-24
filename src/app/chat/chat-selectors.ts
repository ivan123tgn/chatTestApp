import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ChatState} from "./reducers";


export const selectChatState = createFeatureSelector<ChatState>('chat');

export const allChatDialogs = createSelector(
  selectChatState,
  chat => chat.dialogs
);
