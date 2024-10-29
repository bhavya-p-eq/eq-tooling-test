import { NextResponse } from 'next/server';
import { RentalAgreement } from '../../../types/rentalAgreement';

type ToolType = 'ladder' | 'chainsaw' | 'jackhammer';

const toolCharges: Record<ToolType, { dailyCharge: number; weekend: boolean; holiday: boolean }> = {
  ladder: { dailyCharge: 1.99, weekend: true, holiday: false },
  chainsaw: { dailyCharge: 1.49, weekend: false, holiday: true },
  jackhammer: { dailyCharge: 2.99, weekend: false, holiday: false },
};

const holidays = [
  new Date('2023-07-04'), // Independence Day
  new Date('2023-09-04'), // Labor Day (first Monday of September)
];

function isHoliday(date: Date): boolean {
  return holidays.some(holiday => holiday.toDateString() === date.toDateString());
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 6 || date.getDay() === 0; // Saturday or Sunday
}

function calculateChargeableDays(checkoutDate: Date, returnDate: Date, toolType: ToolType): number {
  let chargeableDays = 0;

  for (let d = new Date(checkoutDate); d < returnDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
      chargeableDays += 1;
    } else if (toolCharges[toolType].weekend && isWeekend(currentDate)) {
      // Free on weekends
      continue;
    } else if (toolCharges[toolType].holiday && isHoliday(currentDate)) {
      // Free on holidays
      continue;
    }
  }
  return chargeableDays;
}

export async function POST(req: Request) {
  const { toolCode, checkoutDate, returnDate, discountPercent } :any = await req.json();

  const manualDiscount = 5;   

  // Parse dates
  const checkout = new Date(checkoutDate);
  const returnD = new Date(returnDate);
  
  // Validation
  if (checkout >= returnD) {
    return NextResponse.json({ error: 'Checkout date must be before return date.' }, { status: 400 });
  }
  
  // Determine tool type from tool code
  const toolType = Object.keys(toolCharges).find(key => key === toolCode) as ToolType | undefined;
  if (!toolType) {
    return NextResponse.json({ error: 'Invalid tool code.' }, { status: 400 });
  }
  
  // Calculate chargeable days
  const chargeableDays = calculateChargeableDays(checkout, returnD, toolType);
  const dailyCharge = toolCharges[toolType].dailyCharge;
  // Calculate amounts
  const preDiscountAmount = chargeableDays * dailyCharge;
  //###### change here manualDiscount to discountPercent #########
  const discountAmount = (manualDiscount / 100) * preDiscountAmount;
  
  const finalAmount = preDiscountAmount - discountAmount;

  // Create rental agreement
  const rentalAgreement: RentalAgreement = {
    toolCode,
    checkoutDate: checkout.toLocaleDateString('en-US'),
    returnDate: returnD.toLocaleDateString('en-US'),
  //###### change here manualDiscount to discountPercent #########
    discountPercent : manualDiscount,
    chargeableDays,
    dailyCharge,
    prediscountAmount: parseFloat(preDiscountAmount.toFixed(2)),
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalAmount: parseFloat(finalAmount.toFixed(2)),
  };
  console.log(rentalAgreement , 'Calculation Done');
  
  return NextResponse.json(rentalAgreement);
}
