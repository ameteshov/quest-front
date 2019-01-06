export interface IUser {
  id: number;
  name: string;
  email: string;
  role_id: number;
  is_active: boolean;
  reset_token: string;
  questionnaires_count: number;
  created_at: string;
  updated_at: string;

  isAdmin?: boolean;
}
