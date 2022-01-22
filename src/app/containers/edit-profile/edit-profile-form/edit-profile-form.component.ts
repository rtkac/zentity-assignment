import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ProfileField } from '../../../models/profileField.model';
import { UserPatchData } from '../../../models/user.model';
import { ProfileFieldControlService } from '../../../services/profileFieldControl.service';
import { UserFacade } from '../../../store/user/user.facade';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss'],
})
export class EditProfileFormComponent {
  @Input() fields: ProfileField<string>[] | null = [];
  profileEditForm!: FormGroup;
  payLoad = '';

  constructor(private profileFieldControlService: ProfileFieldControlService, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.profileEditForm = this.profileFieldControlService.toFormGroup(this.fields as ProfileField<string>[]);
  }

  onDelete(index: number): void {
    this.fields?.splice(index, 1);
  }

  onSave({ key, value }: UserPatchData) {
    this.userFacade.patchUser({ key, value });
  }

  onClear(key: string): void {
    this.profileEditForm.controls[key].patchValue('');
  }
}
