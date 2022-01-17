import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

import { SetPasswordContainer } from './set-password.container';
import { SetPasswordFormComponent } from './set-password-form/set-password-form.component';

@NgModule({
  declarations: [SetPasswordContainer, SetPasswordFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: SetPasswordContainer }]),
  ],
})
export class SetPasswordModule {}
