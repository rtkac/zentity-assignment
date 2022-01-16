export interface User {
  username: string;
  surname: string;
}

export interface UserData {
  onboarded: boolean;
  user: User;
}
