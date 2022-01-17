import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { UserFacade } from '../../../store/user/user.facade';
import { PasswordValidator } from '../../../validators/password.validator';

@Component({
  selector: 'app-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
})
export class SetPasswordFormComponent implements OnInit, OnDestroy {
  passwordForm!: FormGroup;
  formSubmitAttempt = false;
  loginSubscription$ = new Subscription();

  constructor(private userFacade: UserFacade, private authService: AuthService) {}

  get password(): AbstractControl | null {
    return this.passwordForm.get('password');
  }
  get confirmPassword(): AbstractControl | null {
    return this.passwordForm.get('confirm_password');
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.passwordForm = new FormGroup(
      {
        password: new FormControl(null, [Validators.required, Validators.minLength(9)]),
        confirm_password: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      },
      {
        validators: [PasswordValidator.createMatchValidator('password', 'confirm_password')],
        asyncValidators: [PasswordValidator.createValidPasswordValidator('confirm_password', this.userFacade)],
      },
    );
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.passwordForm.valid) {
      this.loginSubscription$ = this.authService.login();
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription$.unsubscribe();
  }
}
