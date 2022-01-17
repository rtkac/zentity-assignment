import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { UserFacade } from '../store/user/user.facade';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private userFacade: UserFacade) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userFacade.user$.pipe(
      map((userState) => {
        this.authService.isAuthorized.then((isUserAuthorized) => {
          if (isUserAuthorized) {
            this.router.navigate(['profile']);
            return false;
          }
          if (state.url === '/password' && !userState.setUsernameDone) {
            this.router.navigate(['username']);
            return false;
          }
          return true;
        });
        return true;
      }),
    );
  }
}
