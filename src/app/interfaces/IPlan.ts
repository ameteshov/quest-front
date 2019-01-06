export interface IPlan {
  id?: number;
  name: string;
  description: Array<{text: string}>;
  price: number;
  points: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
