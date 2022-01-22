import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProfileField } from 'src/app/models/profileField.model';

@Component({
  selector: 'app-edit-profile-field',
  templateUrl: './edit-profile-field.component.html',
  styleUrls: ['./edit-profile-field.component.scss'],
})
export class EditProfileFieldComponent {
  @Output() handleDelete = new EventEmitter();
  @Output() handleSave = new EventEmitter<{ key: string; value?: string }>();
  @Output() handleClear = new EventEmitter<string>();
  @Input() field!: ProfileField<string>;
  @Input() form!: FormGroup;
  editedField?: string = undefined;

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isValidRequired() {
    return this.form.controls[this.field.key].errors?.['required'];
  }

  get isValidEmail() {
    return this.form.controls[this.field.key].errors?.['email'];
  }

  get isValidPattern() {
    return this.form.controls[this.field.key].errors?.['pattern'];
  }

  onEdit(): void {
    this.editedField = this.field.key;
  }

  onDelete(): void {
    this.handleDelete.emit();
  }

  onSave(): void {
    if (this.isValid) {
      this.editedField = undefined;
      this.handleSave.emit({ key: this.field.key, value: this.field.value });
    }
  }

  onClear(): void {
    this.handleClear.emit(this.field.key);
  }
}
