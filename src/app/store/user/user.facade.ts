import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';
import * as UserActions from './user.actions';
import { UserData, UserPatchData } from 'src/app/models/user.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$ = this.store.pipe(map((state) => state.user));

  constructor(private store: Store<fromApp.AppState>) {} // eslint-disable-line ngrx/no-typed-global-store

  fetchUser() {
    this.store.dispatch(UserActions.fetchUser());
  }

  fetchUserSuccess(payload: UserData) {
    this.store.dispatch(UserActions.fetchUserSuccess({ payload }));
  }

  fetchUserFailed() {
    this.store.dispatch(UserActions.fetchUserFailed());
  }

  setUsernameDone() {
    this.store.dispatch(UserActions.setUsernameDone());
  }

  patchUser(payload: UserPatchData) {
    this.store.dispatch(UserActions.patchUser({ payload }));
  }
}
