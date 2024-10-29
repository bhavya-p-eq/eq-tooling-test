// lib/holidays.ts
import { Holiday } from '../types/holiday';

export const fetchHolidays = async (year: number): Promise<Holiday[]> => {
  const response = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/US`);
  if (!response.ok) {
    throw new Error('Failed to fetch holidays');
  }
  const data = await response.json();
  return data as Holiday[]; 
};
