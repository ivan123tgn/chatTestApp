import {createAction, props} from "@ngrx/store";
import {User} from "./models/user.model";

export const login = createAction(
  '[Login Screen] User Login'
)

export const userDataLoaded = createAction(
  '[Load User Effect] User Data Loaded',
  props<{user: User | undefined}> ()
)

export const logout = createAction(
  '[Chat Screen] User Logout'
)

export const createUser = createAction(
  '[Reg Form] User Creation',
  props<{user: User | undefined}> ()
)
