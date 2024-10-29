"use client";
// components/RentalForm.tsx
import React, { useEffect, useState } from 'react';
import { Rental } from '../types/rental';
import { Tool } from '../types/tool';

interface RentalFormProps {}

const RentalForm: React.FC<RentalFormProps> = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools');
        if (!response.ok) {
          throw new Error('Failed to fetch tools');
        }
        const data: any = await response.json(); // Specify Tool[] type
        setTools(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'An error occurred while fetching tools');
      } finally {
        setIsFetching(false);
      }
    };

    fetchTools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTool || !checkoutDate || !returnDate) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const rental: Rental = { toolCode: selectedTool, checkoutDate, returnDate };

    try {
      const response : any = await fetch('/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rental),
      });
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create rental agreement');
        // alert(errorData.error || 'Failed to create rental agreement');
      }

      const data: any = await response.json();
      alert(`Total Cost: $${data.totalCost}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTool(value);
    const selectedTool :any = tools.find(tool => tool.type === value); 
    setDiscount(selectedTool.code)
};
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Select Tool</label>
        {isFetching ? (
          <p>Loading tools...</p>
        ) : (
          <select
            onChange={handleChanges}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select a Tool</option>
            {tools.map(tool => (
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Return Date</label>
        <input
          type="date"
          onChange={(e) => setReturnDate(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Discount Code</label>
        <input
          type="string"
          value={discount}
          placeholder="Discount Code"
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-not-allowed"
          disabled
        />
      </div>

      {errorMessage && <div className="text-red-600">{errorMessage}</div>}

      <button
        type="submit"
        className={`w-full bg-teal-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </form>
  );
};

export default RentalForm;
