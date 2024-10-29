// "use client"; // Ensure this is a client component
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { Rental } from '../types/rental';
// import { Tool } from '../types/tool';

// interface RentalFormProps {}

// const RentalForm: React.FC<RentalFormProps> = () => {
//   const router = useRouter();
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [selectedTool, setSelectedTool] = useState<string>('');
//   const [checkoutDate, setCheckoutDate] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isFetching, setIsFetching] = useState(true);

//   useEffect(() => {
//     const fetchTools = async () => {
//       try {
//         const response = await fetch('/api/tools');
//         if (!response.ok) {
//           throw new Error('Failed to fetch tools');
//         }
//         const data: any = await response.json(); // Specify Tool[] type
//         setTools(data);
//       } catch (error) {
//         setErrorMessage(error instanceof Error ? error.message : 'An error occurred while fetching tools');
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchTools();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedTool || !checkoutDate || !returnDate) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage('');

//     const rental: Rental = { toolCode: selectedTool, checkoutDate, returnDate };

//     try {
//       const response : any = await fetch('/api/rentals', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(rental),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to create rental agreement');
//       } else {
//         setTimeout(() => {
//           router.push('/');
//         }, 2000)
//       }
//       // Redirect on success
//     } catch (error) {
//       setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedTool(value);
//     const selectedTool: any = tools.find(tool => tool.type === value);
//     setDiscount(selectedTool?.code || ''); // Handle case if selectedTool is undefined
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block font-medium">Select Tool</label>
//         {isFetching ? (
//           <p>Loading tools...</p>
//         ) : (
//           <select
//             onChange={handleChanges}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           >
//             <option value="">Select a Tool</option>
//             {tools.map(tool => (
//               <option key={tool.code} value={tool.type}>{`${tool.code} - ${tool.brand}`}</option>
//             ))}
//           </select>
//         )}
//       </div>

//       <div>
//         <label className="block font-medium">Checkout Date</label>
//         <input
//           type="date"
//           onChange={(e) => setCheckoutDate(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Return Date</label>
//         <input
//           type="date"
//           onChange={(e) => setReturnDate(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Discount Code</label>
//         <input
//           type="string"
//           value={discount}
//           placeholder="Discount Code"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-not-allowed"
//           disabled
//         />
//       </div>

//       {errorMessage && <div className="text-red-600">{errorMessage}</div>}

//       <button
//         type="submit"
//         className={`w-full bg-teal-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Checkout'}
//       </button>
//     </form>
//   );
// };

// export default RentalForm;

// "use client"; // Ensure this is a client component
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import { RentalTransaction1 } from '../types/rental';
// import { Tool } from '../types/tool';

// type ToolType = "ladder" | "chainsaw" | "jackhammer";

// const toolCharges: Record<ToolType, { dailyCharge: number; weekend: boolean; holiday: boolean }> = {
//   ladder: { dailyCharge: 1.99, weekend: true, holiday: false },
//   chainsaw: { dailyCharge: 1.49, weekend: false, holiday: true },
//   jackhammer: { dailyCharge: 2.99, weekend: false, holiday: false },
// }

// const holidays = [
//   new Date("2023-07-04"), // Independence Day
//   new Date("2023-09-04"), // Labor Day (first Monday of September)
// ];

// const isHoliday = (date: Date): boolean => {
//   return holidays.some(holiday => holiday.toDateString() === date.toDateString());
// };

// const isWeekend = (date: Date): boolean => {
//   return date.getDay() === 6 || date.getDay() === 0; // Saturday or Sunday
// };

// const calculateChargeableDays = (checkoutDate: Date, returnDate: Date, toolType: ToolType): number => {
//   let chargeableDays = 0;

//   for (let d = new Date(checkoutDate); d < returnDate; d.setDate(d.getDate() + 1)) {
//     const currentDate = new Date(d);
//     if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
//       chargeableDays += 1;
//     } else if (toolCharges[toolType].weekend && isWeekend(currentDate)) {
//       continue; // Free on weekends
//     } else if (toolCharges[toolType].holiday && isHoliday(currentDate)) {
//       continue; // Free on holidays
//     }
//   }
//   return chargeableDays;
// };

// const RentalForm: React.FC = () => {
//   const router = useRouter();
//   const [tools, setTools] = useState<Tool[]>([]);
//   const [selectedTool, setSelectedTool] = useState<string>('');
//   const [checkoutDate, setCheckoutDate] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isFetching, setIsFetching] = useState(true);

//   useEffect(() => {
//     const fetchTools = async () => {
//       try {
//         const response = await fetch('/api/tools');
//         if (!response.ok) {
//           throw new Error('Failed to fetch tools');
//         }
//         // Tool[]
//         const data: any  = await response.json();
//         setTools(data);
//       } catch (error) {
//         setErrorMessage(error instanceof Error ? error.message : 'An error occurred while fetching tools');
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchTools();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedTool || !checkoutDate || !returnDate) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage('');

//     const checkout = new Date(checkoutDate);
//     const returnD = new Date(returnDate);

//     // Validation
//     if (checkout >= returnD) {
//       setErrorMessage("Checkout date must be before return date.");
//       setLoading(false);
//       return;
//     }

//     // Determine tool type from selected tool
//     const toolType = selectedTool as ToolType;
//     if (!toolCharges[toolType]) {
//       setErrorMessage("Invalid tool code.");
//       setLoading(false);
//       return;
//     }

//     // Calculate chargeable days and amounts
//     const chargeableDays = calculateChargeableDays(checkout, returnD, toolType);
//     const dailyCharge = toolCharges[toolType].dailyCharge;
//     const preDiscountAmount = chargeableDays * dailyCharge;
//     const discountPercent = parseFloat(discount) || 0; // Use the discount from input
//     const discountAmount = (discountPercent / 100) * preDiscountAmount;
//     const finalAmount = preDiscountAmount - discountAmount;

//     // Create rental agreement
//     const rentalAgreement: RentalTransaction1 = {
//       toolCode: selectedTool,
//       checkoutDate: checkout.toLocaleDateString("en-US"),
//       returnDate: returnD.toLocaleDateString("en-US"),
//       discountPercent,
//       chargeableDays,
//       dailyCharge,
//       preDiscountAmount: parseFloat(preDiscountAmount.toFixed(2)),
//       discountAmount: parseFloat(discountAmount.toFixed(2)),
//       finalAmount: parseFloat(finalAmount.toFixed(2)),
//     };

//     // You can now handle rentalAgreement as needed (e.g., display it or send it somewhere)
//     console.log(rentalAgreement);

//     // Redirect on success
//     setTimeout(() => {
//       router.push('/');
//     }, 5000);

//     setLoading(false);
//   };

//   const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedTool(value);
//     const selectedTool = tools.find(tool => tool.type === value);
//     setDiscount(selectedTool?.code || ''); // Handle case if selectedTool is undefined
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block font-medium">Select Tool</label>
//         {isFetching ? (
//           <p>Loading tools...</p>
//         ) : (
//           <select
//             onChange={handleChanges}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           >
//             <option value="">Select a Tool</option>
//             {tools.map(tool => (
//               <option key={tool.code} value={tool.type}>{`${tool.code} - ${tool.brand}`}</option>
//             ))}
//           </select>
//         )}
//       </div>

//       <div>
//         <label className="block font-medium">Checkout Date</label>
//         <input
//           type="date"
//           onChange={(e) => setCheckoutDate(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Return Date</label>
//         <input
//           type="date"
//           onChange={(e) => setReturnDate(e.target.value)}
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//           required
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Discount Percentage</label>
//         <input
//           type="number"
//           value={discount}
//           onChange={(e) => setDiscount(e.target.value)}
//           placeholder="Discount Percentage"
//           className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </div>

//       {errorMessage && <div className="text-red-600">{errorMessage}</div>}

//       <button
//         type="submit"
//         className={`w-full bg-teal-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={loading}
//       >
//         {loading ? 'Processing...' : 'Checkout'}
//       </button>
//     </form>
//   );
// };

// export default RentalForm;

// working code above

"use client" // Ensure this is a client component
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { RentalTransaction1 } from "../types/rental"
import { ToolCharges } from "types/charges"
import { Tool } from "../types/tool"

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

const isHoliday = (date: Date): boolean => {
  return holidays.some((holiday) => holiday.toDateString() === date.toDateString())
}

const isWeekend = (date: Date): boolean => {
  return date.getDay() === 6 || date.getDay() === 0 // Saturday or Sunday
}

const calculateChargeableDays = (checkoutDate: Date, returnDate: Date, toolType: ToolType): number => {
  let chargeableDays = 0

  for (let d = new Date(checkoutDate); d < returnDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d)
    if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
      chargeableDays += 1
    } else if (toolCharges[toolType].weekend && isWeekend(currentDate)) {
      continue // Free on weekends
    } else if (toolCharges[toolType].holiday && isHoliday(currentDate)) {
      continue // Free on holidays
    }
  }
  return chargeableDays
}

const RentalForm: React.FC = () => {
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [selectedTool, setSelectedTool] = useState<string>("")
  const [checkoutDate, setCheckoutDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [discount, setDiscount] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isFetching, setIsFetching] = useState(true)
  const [toolCharge, setToolCharges] = useState<ToolCharges[]>([])
  // State for displaying calculated amounts
  const [calculationDetails, setCalculationDetails] = useState<{
    chargeableDays: number
    dailyCharge: number
    preDiscountAmount: number
    discountAmount: number
    finalAmount: number
  } | null>(null)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        //fetch tools
        const response = await fetch("/api/tools")
        if (!response.ok) throw new Error("Failed to fetch tools")
        const data: any = await response.json()
        setTools(data)

        //fetch tool charges
        const responseCharges = await fetch("/api/toolcharges")
        if (!responseCharges.ok) throw new Error("Failded To Fetch Toolcharges")
        const dataCharges: any = await responseCharges.json()
        setToolCharges(dataCharges)
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "An error occurred while fetching tools")
      } finally {
        setIsFetching(false)
      }
    }

    fetchTools()
  }, [])

  const handleCalculate = () => {
    if (!selectedTool || !checkoutDate || !returnDate) return

    const checkout = new Date(checkoutDate)
    const returnD = new Date(returnDate)

    // Validate dates
    if (checkout >= returnD) {
      setErrorMessage("Checkout date must be before return date.")
      return
    }

    const toolType = selectedTool as ToolType
    if (!toolCharges[toolType]) return
    const chargeableDays = calculateChargeableDays(checkout, returnD, toolType)
    const dailyCharge = toolCharges[toolType].dailyCharge
    const preDiscountAmount = chargeableDays * dailyCharge
    const discountPercent = parseFloat(discount) || 0
    const discountAmount = (discountPercent / 100) * preDiscountAmount
    const finalAmount = preDiscountAmount - discountAmount
    setCalculationDetails({
      chargeableDays,
      dailyCharge,
      preDiscountAmount: parseFloat(preDiscountAmount.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      finalAmount: parseFloat(finalAmount.toFixed(2)),
    })
  }

  // useEffect to recalculate whenever relevant state changes
  useEffect(() => {
    handleCalculate()
  }, [selectedTool, checkoutDate, returnDate, discount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTool || !checkoutDate || !returnDate) {
      setErrorMessage("Please fill in all fields.")
      return
    }

    setLoading(true)
    setErrorMessage("")

    const checkout = new Date(checkoutDate)
    const returnD = new Date(returnDate)

    // Validate dates again
    if (checkout >= returnD) {
      setErrorMessage("Checkout date must be before return date.")
      setLoading(false)
      return
    }

    // Determine tool type from selected tool
    const toolType = selectedTool as ToolType
    if (!toolCharges[toolType]) {
      setErrorMessage("Invalid tool code.")
      setLoading(false)
      return
    }
    const selectedToolData = tools.find((tool) => tool.type === selectedTool)
    // Create rental agreement
    const rentalAgreement: RentalTransaction1 = {
      toolCode: selectedTool,
      checkoutDate: checkout.toLocaleDateString("en-US"),
      returnDate: returnD.toLocaleDateString("en-US"),
      discountPercent: parseFloat(discount) || 0,
      chargeableDays: calculationDetails?.chargeableDays || 0,
      dailyCharge: calculationDetails?.dailyCharge || 0,
      preDiscountAmount: calculationDetails?.preDiscountAmount || 0,
      discountAmount: calculationDetails?.discountAmount || 0,
      finalAmount: calculationDetails?.finalAmount || 0,
      toolCodePdf: selectedToolData?.code!,
      toolBrand: selectedToolData?.brand!,
    }
    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolCode: selectedTool,
          checkoutDate: checkout.toISOString(),
          returnDate: returnD.toISOString(),
          discountPercent: parseFloat(discount) || 0,
        }),
      })

      if (response.ok) {
        localStorage.setItem("rentalAgreementData", JSON.stringify(rentalAgreement))
        console.log(localStorage)
        const RentalTransaction1 = await response.json()
        localStorage.setItem("rentalAgreement", JSON.stringify(RentalTransaction1))
        setTimeout(() => {
          router.push("/check-out/aggerement")
        }, 5000)
      } else {
        setErrorMessage("An error occurred. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting rental agreement:", error)
      setErrorMessage("An error occurred. Please try again later.")
    }
  }
  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedTool(value)
    const selectedTool = tools.find((tool) => tool.type === value)
    const findDiscount = toolCharge.find((discount) => discount.tool_type === selectedTool?.type)
    setDiscount(findDiscount?.discount.toString() || "") // Adjust based on your logic
    console.log(selectedTool?.code)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Select Tool</label>
        {isFetching ? (
          <p>Loading tools...</p>
        ) : (
          <select
            onChange={handleChanges}
            className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select a Tool</option>
            {tools.map((tool) => (
              <option key={tool.code} value={tool.type}>{`${tool.code} - ${tool.brand}`}</option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block font-medium">Checkout Date</label>
        <input
          type="date"
          onChange={(e) => setCheckoutDate(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Return Date</label>
        <input
          type="date"
          onChange={(e) => setReturnDate(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Discount Percentage</label>
        <input
          type="text"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          readOnly
          disabled
          placeholder="Discount Percentage"
          className="mt-1 block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {errorMessage && <div className="text-red-600">{errorMessage}</div>}

      {/* Display calculation details if available */}
      {calculationDetails && (
        <div className="mt-4 rounded border bg-gray-100 p-4">
          <h3 className="font-medium">Calculation Details:</h3>
          <p>Chargeable Days: {calculationDetails.chargeableDays}</p>
          <p>Daily Charge: ${calculationDetails.dailyCharge.toFixed(2)}</p>
          <p>Pre-Discount Amount: ${calculationDetails.preDiscountAmount.toFixed(2)}</p>
          <p>Discount Amount: ${calculationDetails.discountAmount.toFixed(2)}</p>
          <p className="font-bold">Final Amount: ${calculationDetails.finalAmount.toFixed(2)}</p>
        </div>
      )}

      <button
        type="submit"
        className={`w-full rounded bg-teal-500 py-2 text-white ${loading ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </form>
  )
}

export default RentalForm
