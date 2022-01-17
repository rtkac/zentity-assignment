import { createAction, props } from '@ngrx/store';

import { UserData } from '../../models/user.model';

export const fetchUser = createAction('[User] Fetch User Triggered');
export const fetchUserSuccess = createAction('[User] Fetch User Success', props<{ payload: UserData }>());
export const fetchUserFailed = createAction('[User] Fetch User Failed');
export const setUsernameDone = createAction('[User] Set Username Done');
