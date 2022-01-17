import { AbstractControl } from '@angular/forms';
import { first, map } from 'rxjs';

import { UserFacade } from '../store/user/user.facade';

export class UsernameValidator {
  static createUsernameValidator(userFacade: UserFacade) {
    return (control: AbstractControl) => {
      return userFacade.user$
        .pipe(
          map((userState) => {
            if (control.value !== userState.user?.user.username) {
              return { usernameInvalid: true };
            }
            return null;
          }),
        )
        .pipe(first());
    };
  }
}
