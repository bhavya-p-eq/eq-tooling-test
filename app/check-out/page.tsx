import React from 'react'
import RentalForm from '../../components/RentalForm';

const Checkout = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Tool Rental Application</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* <ToolList tools={tools} /> */}
        <RentalForm />
      </div>
    </div>
  )
}

export default Checkout;
