import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class MaterialModule {}
