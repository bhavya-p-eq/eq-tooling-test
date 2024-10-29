"use client"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import React, { useEffect, useState } from "react"

const TestDocument: React.FC = () => {
  const [rentalData, setRentalData] = useState<any>(null)

  useEffect(() => {
    // Retrieve rental agreement data from localStorage
    const storedRentalAgreement = localStorage.getItem("rentalAgreementData")
    if (storedRentalAgreement) {
      setRentalData(JSON.parse(storedRentalAgreement))
    }
  }, [])
  console.log(rentalData)

  const printDocument = () => {
    const input = document.getElementById("divToPrint")
    if (!input) return

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF()
      const imgWidth = 210
      const pageHeight = pdf.internal.pageSize.height
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // If image height exceeds page height, add new pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save the PDF
      pdf.save("Rental_Agreement.pdf")
    })
  }

  if (!rentalData) {
    return <div>Loading...</div> // Show a loading state while fetching data
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div>
        <div id="divToPrint" className="mt-4 rounded border border-gray-300 p-4 shadow">
          <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 text-center text-2xl font-bold">Tool Rental Agreement</h1>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                This &quot;Tool Rental Agreementt&quot; is made on{" "}
                <span className="font-normal">{new Date().toLocaleDateString("en-US")}</span> between:
              </h2>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">1. Tool Details</h3>
              <p>
                Tool Code: <span className="font-normal">{rentalData.toolCodePdf}</span>
              </p>
              <p>
                Tool Type: <span className="font-normal">{rentalData.toolCode}</span>
              </p>
              <p>
                Brand: <span className="font-normal">{rentalData.toolBrand}</span>
              </p>
              <p>
                Daily Rental Charge: $<span className="font-normal">{rentalData.dailyCharge}</span>
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">2. Rental Period</h3>
              <p>
                Checkout Date: <span className="font-normal">{rentalData.checkoutDate}</span>
              </p>
              <p>
                Return Date: <span className="font-normal">{rentalData.returnDate}</span>
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">3. Charges</h3>
              <p>
                Chargeable Days: <span className="font-normal">{rentalData.chargeableDays}</span>
              </p>
              <p>
                Discount Percent: <span className="font-normal">{rentalData.discountPercent}%</span>
              </p>
              <p>
                Pre-discount Amount: $<span className="font-normal">{rentalData.preDiscountAmount}</span>
              </p>
              <p>
                Discount Amount: $<span className="font-normal">{rentalData.discountAmount}</span>
              </p>
              <p>
                Final Amount Due: $<span className="font-normal">{rentalData.finalAmount}</span>
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">4. Terms and Conditions</h3>
              <ul className="list-inside list-disc">
                <li>The checkout date is a chargeable day, while the return date is not.</li>
                <li>Tools may be free of charge on weekends and holidays as specified.</li>
                <li>The checkout date must be before the return date; otherwise, the agreement is invalid.</li>
              </ul>
            </div>

            <div className="signature mt-10">
              <h3 className="font-semibold">5. Signatures</h3>
              <p>Store Representative Signature: ___________________________ Date: ___________</p>
              <p>Customer Signature: ____________________________ Date: ___________</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 mt-6">
        <button
          onClick={printDocument}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Donwload Document
        </button>
      </div>
    </div>
  )
}

export default TestDocument
