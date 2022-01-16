import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../models/user.model';

import * as UserActions from '../store/user/user.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class UserService {
  private dataUrl = './assets/data.json';

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {}

  public load(): void {
    this.store.dispatch(new UserActions.FetchUser());
    // simulate initializing the app
    setTimeout(() => {
      this.http.get<UserData>(this.dataUrl).subscribe(
        (response) => {
          this.store.dispatch(new UserActions.FetchUserSuccess(response));
        },
        () => {
          this.store.dispatch(new UserActions.FetchUserFailed());
        },
      );
    }, 1000);
  }
}
