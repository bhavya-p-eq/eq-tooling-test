export interface Rental {
  checkoutDate: string
  returnDate: string
  toolCode?: string | number
}

export interface RentalTransaction {
  toolCode: string
  checkoutDate: string // in 'MM/DD/YYYY' format
  returnDate: string // in 'MM/DD/YYYY' format
  discountPercent: number // percentage value (e.g., 10 for 10%)
  chargeableDays: number
  dailyCharge: number // daily charge amount
  prediscountAmount: number // amount before discount
  discountAmount: number // amount of discount applied
  finalAmount: number // total amount after discount
}

export interface RentalTransaction1 {
  toolCode: string // The code of the tool being rented
  checkoutDate: string // Formatted checkout date
  returnDate: string // Formatted return date
  discountPercent: number // Discount percentage applied
  chargeableDays: number // Number of chargeable days
  dailyCharge: number // Daily charge for the tool
  preDiscountAmount: number // Amount before discount
  discountAmount: number // Amount discounted
  finalAmount: number // Final amount after discount

  //for pdf
  toolCodePdf: string
  toolBrand: string
}
