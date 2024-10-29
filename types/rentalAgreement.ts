// /types/rentalAgreement.ts
export interface RentalAgreement {
    toolCode: string;        // Tool Code
    checkoutDate: string;    // Checkout Date (formatted mm/dd/yy)
    returnDate: string;      // Return Date (formatted mm/dd/yy)
    discountPercent: number;  // Discount percent (0-100)
    chargeableDays: number;   // Total chargeable days
    dailyCharge: number;      // Daily rental charge
    prediscountAmount: number; // Total before discount
    discountAmount: number;    // Total discount amount
    finalAmount: number;
           // Final amount after discount
  }
  