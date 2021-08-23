import {createAction, props} from "@ngrx/store";
import {Dialog} from "./models/dialog.model";

export const addDialog = createAction(
  '[Start Dialog Component] Add Dialog',
  props<{dialog: Dialog}>()
);
