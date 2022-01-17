import { ProfileField } from './profileField.model';

export class TextField extends ProfileField<string> {
  override controlType = 'textbox';
}
