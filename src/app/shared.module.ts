import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { HeaderComponent } from './components/header/header.component';
import { InputErrorComponent } from './components/input-error/input-error.component';

@NgModule({
  declarations: [HeaderComponent, InputErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ReactiveFormsModule, HeaderComponent, InputErrorComponent],
})
export class SharedModule {}
