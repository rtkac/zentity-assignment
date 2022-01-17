import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { UserFacade } from '../../../store/user/user.facade';
import { UsernameValidator } from '../../../validators/username.validator';

@Component({
  selector: 'app-set-username-form',
  templateUrl: './set-username-form.component.html',
  styleUrls: ['./set-username-form.component.scss'],
})
export class SetUsernameFormComponent implements OnInit, OnDestroy {
  usernameForm!: FormGroup;
  formSubmitAttempt = false;
  storeAuthUsernameSubscription$ = new Subscription();

  constructor(private router: Router, private authService: AuthService, private userFacade: UserFacade) {}

  get username(): AbstractControl | null {
    return this.usernameForm.get('username');
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.usernameForm = new FormGroup({
      username: new FormControl(
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9 ]*$')],
        [UsernameValidator.createUsernameValidator(this.userFacade)],
      ),
    });
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.usernameForm.valid) {
      this.storeAuthUsernameSubscription$ = this.authService.storeAuthUsername(this.username?.value).subscribe(() => {
        this.userFacade.setUsernameDone();
        this.router.navigate(['password']);
      });
    }
  }

  ngOnDestroy(): void {
    this.storeAuthUsernameSubscription$.unsubscribe();
  }
}
