import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  get isAuthorized(): Promise<boolean> {
    return new Promise((resolve) => resolve(sessionStorage.getItem('onboarded') === 'true'));
  }

  public hasValidUsername(username?: string): Promise<boolean> {
    return new Promise((resolve) => resolve(username === sessionStorage.getItem('username')));
  }

  public storeAuthUsername(username: string): Observable<void> {
    return of(sessionStorage.setItem('username', username));
  }

  public login(): Subscription {
    return of(sessionStorage.setItem('onboarded', 'true')).subscribe(() => this.router.navigate(['profile']));
  }

  public logout(): Subscription {
    return of(sessionStorage.removeItem('onboarded'), sessionStorage.removeItem('username')).subscribe(() =>
      this.router.navigate(['']),
    );
  }
}
