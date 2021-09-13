import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const userId = createSelector(
  selectAuthState,
  auth =>  auth.user?.id
);

export const userEmail = createSelector(
  selectAuthState,
  auth =>  auth.user?.email
);

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => !!auth.user
);

export const avatar = createSelector(
  selectAuthState,
  auth => auth.user?.avatarUrl
);



