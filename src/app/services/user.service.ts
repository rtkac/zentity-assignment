import { Injectable } from '@angular/core';

import { UserFacade } from '../store/user/user.facade';

@Injectable()
export class UserService {
  constructor(private userFacade: UserFacade) {}

  public async loadUser(): Promise<void> {
    this.userFacade.fetchUser();
  }
}
