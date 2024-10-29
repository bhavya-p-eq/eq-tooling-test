import { Rental } from '../types/rental';
import { addDays, isWeekend, parseISO } from 'date-fns';

export const calculateRentalCost = (rental: Rental): number => {
  const checkoutDate = parseISO(rental.checkoutDate);
  const returnDate = parseISO(rental.returnDate);
  const dailyRate = 20; // Assume a fixed rate for simplification

  let totalCost = 0;
  let currentDate = checkoutDate;

  while (currentDate < returnDate) {
    if (!isWeekend(currentDate)) {
      totalCost += dailyRate;
    }
    currentDate = addDays(currentDate, 1);
  }
  // update here dicount logic
  // if (rental.discount) {
  //   totalCost -= totalCost * (rental.discount / 100);
  // }

  return totalCost;
};
