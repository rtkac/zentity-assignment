import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProfileField } from 'src/app/models/profileField.model';
import { ProfileFieldControlService } from 'src/app/services/profileFieldControl.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent {
  @Input() fields: ProfileField<string>[] | null = [];
  profileEditForm!: FormGroup;
  payLoad = '';

  constructor(private profileFieldControlService: ProfileFieldControlService) {}

  ngOnInit(): void {
    this.profileEditForm = this.profileFieldControlService.toFormGroup(this.fields as ProfileField<string>[]);
  }

  onDelete(index: number): void {
    this.fields?.splice(index, 1);
  }

  onClear(key: string): void {
    this.profileEditForm.controls[key].patchValue('');
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.profileEditForm.getRawValue());
    console.log(this.profileEditForm.value);
  }
}
