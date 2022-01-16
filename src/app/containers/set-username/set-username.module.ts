import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SetUsernameContainer } from './set-username.container';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: SetUsernameContainer }])],
})
export class SetUsernameModule {}
