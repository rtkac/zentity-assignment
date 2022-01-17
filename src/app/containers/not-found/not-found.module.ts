import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MaterialModule } from 'src/app/material.module';

import { NotFoundContainer } from './not-found.container';

@NgModule({
  declarations: [NotFoundContainer],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: NotFoundContainer }]),
  ],
})
export class NotFoundModule {}
