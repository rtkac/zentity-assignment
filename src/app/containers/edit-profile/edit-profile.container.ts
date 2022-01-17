import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ProfileField } from '../../models/profileField.model';
import { AuthService } from '../../services/auth.service';
import { ProfileFieldsService } from '../../services/profileFields.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.container.html',
  styleUrls: ['./edit-profile.container.scss'],
})
export class EditProfileContainer implements OnDestroy {
  logoutSubscription$ = new Subscription();
  fields$!: Observable<ProfileField<any>[]>;

  constructor(private authService: AuthService, private profileFieldsService: ProfileFieldsService) {
    this.fields$ = this.profileFieldsService.getFields();
  }

  onLogout(): void {
    this.logoutSubscription$ = this.authService.logout();
  }

  ngOnDestroy(): void {
    this.logoutSubscription$.unsubscribe();
  }
}
