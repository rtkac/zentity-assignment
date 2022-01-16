import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$ = this.store.select('user');

  constructor(private store: Store<fromApp.AppState>) {}
}
