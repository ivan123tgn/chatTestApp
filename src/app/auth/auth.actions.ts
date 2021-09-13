import {createAction, props} from "@ngrx/store";
import {User} from "./models/user.model";

export const login = createAction(
  '[Login Screen] User Login'
)

export const userDataLoaded = createAction(
  '[Load User Effect] User Data Loaded',
  props<{user: User}> ()
)

export const logout = createAction(
  '[Chat Screen] User Logout'
)

export const createUser = createAction(
  '[Reg Form] User Creation',
  props<{user: User}> ()
)

export const addProfileImage = createAction(
  '[Add Image Dialog] User Avatar Added',
  props<{userId: string, avatarUrl: string}> ()
)
