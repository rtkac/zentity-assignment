import { UserData } from '../../models/user.model';
import { fetchUser, fetchUserSuccess, fetchUserFailed, setUsernameDone } from './user.actions';

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

export function userReducer(
  state = initialState,
  action:
    | ReturnType<typeof fetchUser>
    | ReturnType<typeof fetchUserSuccess>
    | ReturnType<typeof fetchUserFailed>
    | ReturnType<typeof setUsernameDone>,
) {
  switch (action.type) {
    case fetchUser.type:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: false,
      };
    case fetchUserSuccess.type:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: false,
        user: action.payload,
      };
    case fetchUserFailed.type:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: true,
      };
    case setUsernameDone.type:
      return {
        ...state,
        setUsernameDone: true,
      };
    default:
      return state;
  }
}
