import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

import { IntroductionContainer } from './introduction.container';

@NgModule({
  declarations: [IntroductionContainer],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: IntroductionContainer }]),
  ],
})
export class IntroductionModule {}
