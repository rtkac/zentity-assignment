import { Location as UserLocation } from './location.model';

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
}

export interface UserContact {
  email: string;
  phoneNumber: string;
  locations: UserLocation[];
  socialNetworks: SocialNetwork[];
}

export interface User {
  name: string;
  surname: string;
  username: string;
  password: string;
  contact: UserContact;
}

export interface UserData {
  onboarded: boolean;
  user: User;
}

export interface UserPatchData {
  key: string;
  value?: string;
}
