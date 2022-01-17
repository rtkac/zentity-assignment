import { AbstractControl, ValidatorFn } from '@angular/forms';
import { first, map } from 'rxjs';

import { UserFacade } from '../store/user/user.facade';

export class PasswordValidator {
  static createMatchValidator(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      }

      if (checkControl?.value) {
        controls.get(checkControlName)?.setErrors(null);
      }
      return null;
    };
  }

  static createValidPasswordValidator(controlName: string, userFacade: UserFacade) {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);

      return userFacade.user$
        .pipe(
          map((userState) => {
            if (control?.value !== userState.user?.user.password) {
              controls.get(controlName)?.setErrors({ passwordInvalid: true });
              return { passwordInvalid: true };
            }
            return null;
          }),
        )
        .pipe(first());
    };
  }
}
