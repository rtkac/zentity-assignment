import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './user.reducer';

export const selectUserState = createFeatureSelector<State>('user');

export const selectUser = createSelector(selectUserState, (state: State) => state.user);
export const selectSetUsernameDone = createSelector(selectUserState, (state: State) => state.setUsernameDone);
export const selectUserLoading = createSelector(selectUserState, (state: State) => state.isLoading);
export const selectUserLoaded = createSelector(selectUserState, (state: State) => state.isLoaded);
export const selectUserError = createSelector(selectUserState, (state: State) => state.isError);
