"use client" // If you're using client components in Next.js 14
import React, { useEffect, useState } from "react"
import { RentalTransaction } from "types/rental" // Adjust the path if necessary

const Agreement = () => {
  const [rentalHistory, setRentalHistory] = useState<RentalTransaction[]>([]) // Type the state

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await fetch("/api/rentals") // Adjust this endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch rental history")
        }
        const data: any = await response.json() // Ensure data is typed correctly
        setRentalHistory(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRentalHistory()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-teal-600">Rental History</h1>
      <table className="min-w-full rounded-lg border border-gray-300 bg-white">
        <thead>
          <tr className="bg-teal-500 text-white">
            <th className="border-b px-4 py-2">Tool</th>
            <th className="border-b px-4 py-2">Checkout Date</th>
            <th className="border-b px-4 py-2">Return Date</th>
            <th className="border-b px-4 py-2">Discount (%)</th>
            <th className="border-b px-4 py-2">Chargeable Days</th>
            <th className="border-b px-4 py-2">Daily Charge</th>
            <th className="border-b px-4 py-2">Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {rentalHistory.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-2 text-center text-gray-700">
                No rental history available.
              </td>
            </tr>
          ) : (
            rentalHistory.map((rental) => (
              <tr key={rental.toolCode} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2 text-center">{rental?.toolCode}</td>
                <td className="border-b px-4 py-2 text-center">
                  {new Date(rental?.checkoutDate).toLocaleDateString()}
                </td>
                <td className="border-b px-4 py-2 text-center">{new Date(rental?.returnDate).toLocaleDateString()}</td>
                <td className="border-b px-4 py-2 text-center">{rental?.discountPercent}</td>
                <td className="border-b px-4 py-2 text-center">{rental?.chargeableDays}</td>
                <td className="border-b px-4 py-2 text-center">${rental?.dailyCharge}</td>
                <td className="border-b px-4 py-2 text-center">${rental?.finalAmount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Agreement
