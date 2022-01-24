import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserFacade } from './store/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userLoadingSubscription$ = new Subscription();
  userLoadedSubscription$ = new Subscription();
  userErrorSubscription$ = new Subscription();
  isLoading = false;
  isLoaded = false;
  isError = false;

  constructor(private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userLoadingSubscription$ = this.userFacade.selectUserLoading$.subscribe(
      (isLoading) => (this.isLoading = isLoading),
    );
    this.userLoadedSubscription$ = this.userFacade.selectUserLoaded$.subscribe(
      (isLoaded) => (this.isLoaded = isLoaded),
    );
    this.userErrorSubscription$ = this.userFacade.selectUserError$.subscribe((isError) => (this.isError = isError));
  }

  ngOnDestroy(): void {
    this.userLoadingSubscription$.unsubscribe();
    this.userLoadedSubscription$.unsubscribe();
    this.userErrorSubscription$.unsubscribe();
  }
}
