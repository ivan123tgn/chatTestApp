import {createAction, props} from "@ngrx/store";
import {Dialog} from "./models/dialog.model";
import {Message} from "./models/message.model";

export const addDialog = createAction(
  '[Start Dialog Component] Add Dialog',
  props<{dialog: Dialog}>()
);

export const loadAllDialogs = createAction(
  '[Dialogs Resolver] Load All Dialogs'
);

export const allDialogsLoaded = createAction(
  '[Load Dialogs Effect] All Dialogs Loaded',
  props<{dialogs: Dialog[]}>()
)

export const addMessageToDialog = createAction(
  '[Start Dialog Component] Add Message To Existing Dialog',
  props<{dialogIndex: number, dialogId: string, message: Message}>()
)
