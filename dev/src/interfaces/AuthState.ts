export interface UserInterface {
  roles: string[];
}
export interface AuthStateInterface {
  token: string | null;
  user: UserInterface;
}
