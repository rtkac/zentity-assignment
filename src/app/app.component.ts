import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { UserFacade } from './store/user/user.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription$ = new Subscription();
  logoutSubscription$ = new Subscription();
  isLoading = false;
  isLoaded = false;
  isError = false;

  constructor(private userFacade: UserFacade, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription$ = this.userFacade.user$.subscribe((userState) => {
      this.isLoading = userState.isLoading;
      if (userState.user?.user) {
        this.authService.isAuthorized.then((isAuthorized) => {
          if (isAuthorized) {
            this.authService.hasValidUsername(userState.user?.user.username).then((validUsername) => {
              if (!validUsername) {
                this.logoutSubscription$ = this.authService.logout();
              }
            });
          }
          this.isLoaded = userState.isLoaded;
          this.isError = userState.error;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.logoutSubscription$.unsubscribe();
  }
}
