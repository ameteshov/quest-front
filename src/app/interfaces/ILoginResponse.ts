import { IUser } from './IUser';

export interface ILoginResponse {
  refresh_ttl: string;
  token: string;
  ttl: string;
  user: IUser;
}
