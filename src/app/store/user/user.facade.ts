import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';
import * as UserActions from './user.actions';
import { UserData } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$ = this.store.select((state) => state.user); // eslint-disable-line ngrx/prefer-selector-in-select

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
}
