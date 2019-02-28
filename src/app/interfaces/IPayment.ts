import { IUser } from './IUser';

export interface IPayment {
  id?: number;
  status?: string;
  amount?: string;
  payment_id?: string;
  user?: IUser;
  created_at?: string;
  started_at?: string;
}
