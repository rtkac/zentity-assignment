import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared.module';
import { MaterialModule } from '../../material.module';

import { EditProfileContainer } from './edit-profile.container';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { EditProfileFieldComponent } from './edit-profile-field/edit-profile-field.component';
import { EditProfileSocials } from './edit-form-socials/edit-form-socials.component';

@NgModule({
  declarations: [EditProfileContainer, EditProfileFormComponent, EditProfileFieldComponent, EditProfileSocials],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: EditProfileContainer }]),
  ],
})
export class EditProfileModule {}
