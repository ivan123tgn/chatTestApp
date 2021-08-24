import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {Dialog} from "../models/dialog.model";
import {DialogsActions} from "../action-types";
import {deepCloneNode} from "@angular/cdk/drag-drop/clone-node";

export interface ChatState {
  dialogs: Dialog [];
}

export const initialDialogsState: ChatState = {
  dialogs: []
}

export const dialogsReducer = createReducer(
  initialDialogsState,
  on(DialogsActions.addDialog, (state, action) => {
    return {
      dialogs: [...state.dialogs, action.dialog]
    }
  }),
  on(DialogsActions.allDialogsLoaded, (state, action) => {
    return {
      dialogs: action.dialogs
    }
  }),
  on(DialogsActions.addMessageToDialog, (state, action) => {
    let newDialogs: Dialog [] = JSON.parse(JSON.stringify(state.dialogs));
    newDialogs[action.dialogIndex].messages.push(action.message);
    return {
      dialogs: newDialogs
    }
  }),
  on(DialogsActions.dialogByIdLoaded, (state, action) => {
    return {
      dialogs: [action.dialog]
    }
  })
)

