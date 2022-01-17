import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserData } from '../models/user.model';

import { UserFacade } from '../store/user/user.facade';

@Injectable()
export class UserService {
  private dataUrl = './assets/data.json';

  constructor(private http: HttpClient, private userFacade: UserFacade) {}

  public async loadUser(): Promise<void> {
    this.userFacade.fetchUser();
    // simulate app initializing
    setTimeout(() => {
      return new Promise((resolve) => {
        this.http.get<UserData>(this.dataUrl).subscribe({
          next: (response) => {
            this.userFacade.fetchUserSuccess(response);
            return resolve(response);
          },
          error: () => {
            this.userFacade.fetchUserFailed();
            return resolve(null);
          },
        });
      });
    }, 1000);
  }
}
