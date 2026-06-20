export type Category = 'transportation' | 'diet' | 'energy' | 'shopping';

export interface ActivityOption {
  id: string;
  label: string;
  unit: string;
  factor: number; 
}

export interface ActivityLog {
  id: string;
  date: string;
  categoryId: Category;
  activityId: string;
  value: number;
  co2e: number;
}

export interface CarbonStats {
  totalCurrentMonth: number;
  totalPreviousMonth: number;
  target: number;
}
