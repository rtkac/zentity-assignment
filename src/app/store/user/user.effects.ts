import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, of } from 'rxjs';

import { UserData } from '../../models/user.model';
import * as UserActions from './user.actions';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUser),
      switchMap(() => {
        return this.http.get<UserData>('assets/data.json');
      }),
      map((response) => {
        this.authService.hasValidUsername(response.user.username).then((hasValidUsername) => {
          if (!hasValidUsername) {
            this.authService.logout();
          }
        });
        return UserActions.fetchUserSuccess({ payload: response });
      }),
      catchError(() => {
        return of(UserActions.fetchUserFailed());
      }),
    );
  });
  patchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.patchUser),

      // ----------------------
      // if there is a backend, patch the user data will be the best option
      // ----------------------
      // map((action: { payload: UserPatchData }) => action.payload),
      // switchMap((action: { payload: UserPatchData }) => {
      //   return this.http.patch<UserData>('assets/data.json', action.payload);
      // }),

      // ----------------------
      // instead of that, we pretend that we have success response after the patch user data
      // so we just modify response with patch user action payload data
      // ----------------------
      switchMap(() => {
        return this.http.get<UserData>('assets/data.json');
      }),
      map((user) => {
        return UserActions.patchUserSuccess({ payload: user });
      }),
      catchError((_, caught) => {
        UserActions.patchUserFailed();
        return caught;
      }),
    );
  });

  constructor(private actions$: Actions, private http: HttpClient, private authService: AuthService) {}
}
