import { Category, ActivityOption } from '../types';

export const CATEGORIES: { id: Category; label: string; color: string; icon: string }[] = [
  { id: 'transportation', label: 'Transportation', color: '#3b82f6', icon: 'Car' },
  { id: 'diet', label: 'Diet & Food', color: '#10b981', icon: 'Utensils' },
  { id: 'energy', label: 'Home Energy', color: '#f59e0b', icon: 'Zap' },
  { id: 'shopping', label: 'Shopping', color: '#8b5cf6', icon: 'ShoppingBag' },
];

export const EMISSION_OPTIONS: Record<Category, ActivityOption[]> = {
  transportation: [
    { id: 'car_gasoline', label: 'Car (Gasoline)', unit: 'km', factor: 0.192 },
    { id: 'car_electric', label: 'Car (Electric)', unit: 'km', factor: 0.053 },
    { id: 'bus', label: 'Public Bus', unit: 'km', factor: 0.105 },
    { id: 'train', label: 'Train', unit: 'km', factor: 0.041 },
    { id: 'flight_short', label: 'Flight (Short Haul)', unit: 'hours', factor: 250 },
  ],
  diet: [
    { id: 'beef_meal', label: 'Beef Meal', unit: 'meals', factor: 7.7 },
    { id: 'chicken_meal', label: 'Chicken Meal', unit: 'meals', factor: 1.8 },
    { id: 'vegetarian_meal', label: 'Vegetarian Meal', unit: 'meals', factor: 0.8 },
    { id: 'vegan_meal', label: 'Vegan Meal', unit: 'meals', factor: 0.4 },
  ],
  energy: [
    { id: 'electricity', label: 'Electricity', unit: 'kWh', factor: 0.385 },
    { id: 'natural_gas', label: 'Natural Gas', unit: 'kWh', factor: 0.203 },
  ],
  shopping: [
    { id: 'clothes', label: 'New Clothing Item', unit: 'items', factor: 15.0 },
    { id: 'electronics', label: 'Small Electronics', unit: 'items', factor: 60.0 },
  ],
};
