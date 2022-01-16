import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserFacade } from './store/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  appConfigSubscription$ = new Subscription();
  isLoading = false;
  isLoaded = false;
  isError = false;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.appConfigSubscription$ = this.userFacade.user$.subscribe((userState) => {
      this.isLoading = userState.isLoading;
      this.isLoaded = userState.isLoaded;
      this.isError = userState.error;
    });
  }

  ngOnDestroy(): void {
    this.appConfigSubscription$.unsubscribe();
  }
}
