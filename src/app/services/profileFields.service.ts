import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { ProfileField } from '../models/profileField.model';
import { TextField } from '../models/textField.model';
import { UserFacade } from '../store/user/user.facade';

@Injectable({ providedIn: 'root' })
export class ProfileFieldsService {
  constructor(private userFacade: UserFacade) {}

  getFields() {
    return this.userFacade.user$.pipe(
      map((userState) => {
        const userData = userState?.user;
        const homeAddress = userData?.contact.locations.find((location) => location.name === 'address');

        const fields: ProfileField<string>[] = [
          new TextField({
            key: 'name',
            label: 'Name',
            value: `${userData?.name} ${userData?.surname}`,
            required: true,
            pattern: '^[a-zA-Z0-9 ]*$',
          }),

          new TextField({
            key: 'username',
            label: 'Username',
            value: userData?.username,
            required: true,
            pattern: '^[a-zA-Z0-9 ]*$',
          }),

          new TextField({
            key: 'streetName',
            label: 'Address',
            value: `${homeAddress?.address.streetName} ${homeAddress?.address.streetNumber}`,
            required: true,
          }),

          new TextField({
            key: 'suburb',
            label: 'City',
            value: homeAddress?.address.suburb,
            required: true,
          }),

          new TextField({
            key: 'postalCode',
            label: 'Postal Code',
            value: homeAddress?.address.postalCode,
            required: true,
            pattern: RegExp('^[0-9 ]*$'),
          }),

          new TextField({
            key: 'email',
            label: 'E-mail',
            value: userData?.contact.email,
            type: 'email',
            required: true,
            email: true,
          }),

          new TextField({
            key: 'phoneNumber',
            label: 'Phone',
            value: userData?.contact.phoneNumber,
            required: true,
            pattern: RegExp('^[+]?[0-9 ]*$'),
          }),
        ];

        return fields;
      }),
    );
  }
}
