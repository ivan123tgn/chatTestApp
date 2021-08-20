import {createAction, props} from "@ngrx/store";
import {User} from "./models/user.model";

export const login = createAction(
  '[Login Screen] User Login',
  props<{user: User | undefined}> ()
)

export const logout = createAction(
  '[Chat Screen] User Logout'
)
