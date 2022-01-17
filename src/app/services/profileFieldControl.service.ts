import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileField } from '../models/profileField.model';

@Injectable({ providedIn: 'root' })
export class ProfileFieldControlService {
  toFormGroup(fields: ProfileField<string>[]) {
    const group: any = {};

    fields.forEach((field) => {
      const fieldValidators = [];
      field.required && fieldValidators.push(Validators.required);
      field.email && fieldValidators.push(Validators.email);
      field.pattern && fieldValidators.push(Validators.pattern(field.pattern));

      group[field.key] = new FormControl(field.value || '', fieldValidators);
    });
    return new FormGroup(group);
  }
}
