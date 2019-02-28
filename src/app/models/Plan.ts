import { IPlan } from '../interfaces/IPlan';
import { PlanTypes } from '../enums/plan-types.enum';

export class Plan implements IPlan {
  public id: number;
  public name: string;
  public description: Array<{ text: string }>;
  public price: number;
  public slug: string;
  public points: number;
  public is_active: boolean;
  public type: PlanTypes;
  public created_at: string;
  public updated_at: string;

  public constructor(data: any = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || [];
    this.price = data.price || null;
    this.slug = data.slug || '';
    this.points = data.points || null;
    this.is_active = data.is_active || null;
    this.type = data.type;
    this.created_at = data.created_at || '';
    this.updated_at = data.updated_at || '';
  }
}
