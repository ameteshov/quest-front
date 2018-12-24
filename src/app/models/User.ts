import { IUser } from '../interfaces/IUser';
import { Roles } from '../enums/roles.enum';

export class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public role_id: number;
  public reset_token: string;
  public is_active: boolean;
  public created_at: string;
  public updated_at: string;

  public constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.role_id = data.role_id || null;
    this.reset_token = data.reset_token || '';
    this.is_active = data.is_active || null;
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }

  public get isAdmin(): boolean {
    return this.role_id === Roles.admin;
  }
}
