import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import {AuthActions} from "../action-types";
import {User} from "../models/user.model";

export interface AuthState {
  user: User | undefined
}

export const initialAuthState: AuthState = {
  user: undefined
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      user: undefined
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  }),
  on(AuthActions.createUser, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.userDataLoaded, (state, action) => {
    return {
      user: action.user
    }
  })
)
