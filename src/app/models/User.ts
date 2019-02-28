import { IUser } from '../interfaces/IUser';
import { Roles } from '../enums/roles.enum';

export class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public role_id: number;
  public reset_token: string;
  public is_active: boolean;
  public questionnaires_count: number;
  public points: number;
  public created_at: string;
  public updated_at: string;

  public constructor(data: any = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.role_id = data.role_id || null;
    this.reset_token = data.reset_token || '';
    this.questionnaires_count = data.questionnaires_count || null;
    this.points = data.points || null;
    this.is_active = data.is_active || null;
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }

  public get isAdmin(): boolean {
    return this.role_id === Roles.admin;
  }
}
