import { PlanTypes } from '../enums/plan-types.enum';

export interface IPlan {
  id?: number;
  name: string;
  description: Array<{text: string}>;
  price: number;
  slug: string;
  points: number;
  is_active: boolean;
  type: PlanTypes;
  created_at?: string;
  updated_at?: string;
}
