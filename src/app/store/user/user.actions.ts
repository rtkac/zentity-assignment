import { createAction, props } from '@ngrx/store';

import { UserData, UserPatchData } from '../../models/user.model';

export const fetchUser = createAction('[User] Fetch User Triggered');
export const fetchUserSuccess = createAction('[User] Fetch User Success', props<{ payload: UserData }>());
export const fetchUserFailed = createAction('[User] Fetch User Failed');
export const setUsernameDone = createAction('[User] Set Username Done');
export const patchUser = createAction('[User] Patch User Triggered', props<{ payload: UserPatchData }>());
export const patchUserSuccess = createAction('[User] Patch User Success', props<{ payload: UserData }>());
export const patchUserFailed = createAction('[User] Patch User Failed');
