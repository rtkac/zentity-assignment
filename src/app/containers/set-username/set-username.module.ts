import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

import { SetUsernameContainer } from './set-username.container';
import { SetUsernameFormComponent } from './set-username-form/set-username-form.component';

@NgModule({
  declarations: [SetUsernameContainer, SetUsernameFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: SetUsernameContainer }]),
  ],
})
export class SetUsernameModule {}
