import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ChatState} from "./reducers";
import {Dialog} from "./models/dialog.model";


export const selectChatState = createFeatureSelector<ChatState>('chat');

export const allChatDialogs = createSelector(
  selectChatState,
  chat => chat.dialogs
);

export const getDialogById = (id: string) => createSelector(
  allChatDialogs, (dialogs) => dialogs.filter(dialog => dialog.id === id)
);
