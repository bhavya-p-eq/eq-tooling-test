import { NextResponse } from "next/server"
import { getConnection } from "../config/db"

export async function GET() {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute<any>("SELECT * FROM toolcharges") // Adjust table name and query as needed
    await connection.end()

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
