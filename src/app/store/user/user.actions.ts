import { Action } from '@ngrx/store';

import { UserData } from '../../models/user.model';

export const FETCH_USER_TRIGGERED = '[User] Fetch User Triggered';
export const FETCH_USER_SUCCESS = '[User] Fetch User Success';
export const FETCH_USER_FAILED = '[User] Fetch User Failed';

export class FetchUser implements Action {
  readonly type = FETCH_USER_TRIGGERED;
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;

  constructor(public payload: UserData) {}
}

export class FetchUserFailed implements Action {
  readonly type = FETCH_USER_FAILED;
}

export type UserActions = FetchUser | FetchUserSuccess | FetchUserFailed;
