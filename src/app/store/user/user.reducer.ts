import { createFeature, createReducer, on } from '@ngrx/store';

import { UserData } from '../../models/user.model';
import { fetchUser, fetchUserSuccess, fetchUserFailed, setUsernameDone, patchUserSuccess } from './user.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: boolean;
  user: UserData | null;
  setUsernameDone: boolean;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: false,
  user: null,
  setUsernameDone: false,
};

export const userReducer = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(
      fetchUser,
      (state): State => ({
        ...state,
        isLoading: true,
        isLoaded: false,
        error: false,
      }),
    ),
    on(
      fetchUserSuccess,
      (state, action): State => ({
        ...state,
        isLoading: false,
        isLoaded: true,
        error: false,
        user: action.payload,
      }),
    ),
    on(
      fetchUserFailed,
      (state): State => ({
        ...state,
        isLoading: false,
        isLoaded: false,
        error: true,
      }),
    ),
    on(
      setUsernameDone,
      (state): State => ({
        ...state,
        setUsernameDone: true,
      }),
    ),
    on(
      patchUserSuccess,
      (state, action): State => ({
        ...state,
        user: action.payload,
      }),
    ),
  ),
});
