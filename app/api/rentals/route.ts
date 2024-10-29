import { NextResponse } from "next/server"
import { RentalTransaction } from "../../../types/rental"
import { RentalAgreement } from "../../../types/rentalAgreement"
import { getConnection } from "../config/db"
type ToolType = "ladder" | "chainsaw" | "jackhammer"

const toolCharges: Record<ToolType, { dailyCharge: number; weekend: boolean; holiday: boolean }> = {
  ladder: { dailyCharge: 1.99, weekend: true, holiday: false },
  chainsaw: { dailyCharge: 1.49, weekend: false, holiday: true },
  jackhammer: { dailyCharge: 2.99, weekend: false, holiday: false },
}

const holidays = [
  new Date("2023-07-04"), // Independence Day
  new Date("2023-09-04"), // Labor Day (first Monday of September)
]

function isHoliday(date: Date): boolean {
  return holidays.some((holiday) => holiday.toDateString() === date.toDateString())
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 6 || date.getDay() === 0 // Saturday or Sunday
}

function calculateChargeableDays(checkoutDate: Date, returnDate: Date, toolType: ToolType): number {
  let chargeableDays = 0

  for (let d = new Date(checkoutDate); d < returnDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d)
    if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
      chargeableDays += 1
    } else if (toolCharges[toolType].weekend && isWeekend(currentDate)) {
      // Free on weekends
      continue
    } else if (toolCharges[toolType].holiday && isHoliday(currentDate)) {
      // Free on holidays
      continue
    }
  }
  return chargeableDays
}

export async function POST(req: Request) {
  const { toolCode, checkoutDate, returnDate, discountPercent }: any = await req.json()

  // Parse dates
  const checkout = new Date(checkoutDate)
  const returnD = new Date(returnDate)
  // Validation
  if (checkout >= returnD) {
    return NextResponse.json({ error: "Checkout date must be before return date." }, { status: 400 })
  }

  // Determine tool type from tool code
  const toolType = Object.keys(toolCharges).find((key) => key === toolCode) as ToolType | undefined
  if (!toolType) {
    return NextResponse.json({ error: "Invalid tool code." }, { status: 400 })
  }

  // Calculate chargeable days
  const chargeableDays = calculateChargeableDays(checkout, returnD, toolType)
  const dailyCharge = toolCharges[toolType].dailyCharge
  // Calculate amounts
  const preDiscountAmount = chargeableDays * dailyCharge
  //###### change here manualDiscount to discountPercent #########
  const discountAmount = (discountPercent / 100) * preDiscountAmount

  const finalAmount = preDiscountAmount - discountAmount

  // Create rental agreement
  const rentalAgreement: RentalAgreement = {
    toolCode,
    checkoutDate: checkout.toISOString().slice(0, 10),
    returnDate: returnD.toISOString().slice(0, 10),
    //###### change here manualDiscount to discountPercent #########
    discountPercent: discountPercent,
    chargeableDays,
    dailyCharge,
    prediscountAmount: parseFloat(preDiscountAmount.toFixed(2)),
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalAmount: parseFloat(finalAmount.toFixed(2)),
  }
  try {
    const connection = await getConnection()
    const insertQuery = `
      INSERT INTO rentalTransaction (toolCode, checkoutDate, returnDate, discountPercent, chargeableDays, dailyCharge, preDiscountAmount, discountAmount, finalAmount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      rentalAgreement.toolCode,
      rentalAgreement.checkoutDate,
      rentalAgreement.returnDate,
      rentalAgreement.discountPercent,
      rentalAgreement.chargeableDays,
      rentalAgreement.dailyCharge,
      rentalAgreement.prediscountAmount,
      rentalAgreement.discountAmount,
      rentalAgreement.finalAmount,
    ]

    await connection.execute(insertQuery, values)
    await connection.end()

    return NextResponse.json(rentalAgreement)
  } catch (error) {
    console.error("Database insertion error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
  // return NextResponse.json(rentalAgreement)
}

export async function GET() {
  // return NextResponse.json(testData)
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute<any>("SELECT * FROM rentalTransaction") // Adjust table name and query as needed
    await connection.end()

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
