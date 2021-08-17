import {createAction, props} from "@ngrx/store";
import firebase from "firebase";

export const login = createAction(
  '[Login Screen] User Login',
  props<{user: string | undefined}> ()
)
