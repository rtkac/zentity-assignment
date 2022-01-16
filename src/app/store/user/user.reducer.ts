import { UserData } from '../../models/user.model';
import * as UserActions from './user.actions';

export interface State {
  isLoading: boolean;
  isLoaded: boolean;
  error: boolean;
  user: UserData | null;
}

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  error: false,
  user: null,
};

export function userReducer(state = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.FETCH_USER_TRIGGERED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: false,
      };
    case UserActions.FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: false,
        user: action.payload,
      };
    case UserActions.FETCH_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: true,
      };
    default:
      return state;
  }
}
