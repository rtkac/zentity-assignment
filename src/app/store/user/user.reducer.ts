import { createFeature, createReducer, on } from '@ngrx/store';

import { UserData } from '../../models/user.model';
import { fetchUser, fetchUserSuccess, fetchUserFailed, setUsernameDone, patchUserSuccess } from './user.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  user: UserData | null;
  setUsernameDone: boolean;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  isError: false,
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
        isError: false,
      }),
    ),
    on(
      fetchUserSuccess,
      (state, action): State => ({
        ...state,
        isLoading: false,
        isLoaded: true,
        isError: false,
        user: action.payload,
      }),
    ),
    on(
      fetchUserFailed,
      (state): State => ({
        ...state,
        isLoading: false,
        isLoaded: false,
        isError: true,
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
