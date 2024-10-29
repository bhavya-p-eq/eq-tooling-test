// "use client";
// import { useEffect, useState } from 'react';
// import ToolList from '../components/ToolList';
import RentalForm from "../components/RentalForm"
// import { Tool } from '../types/tool';
import Link from 'next/link';


const Home: React.FC = () => {
  // const [tools, setTools] = useState<Tool[]>([]);

  // useEffect(() => {
  //   const fetchTools = async () => {
  //     const response = await fetch('/api/tools');
  //     console.log('response', response.json());
  //     const data: any = await response.json();
  //     console.log(data, 'get data');
  //     setTools(data);
  //   };
  //   fetchTools();
  // }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-4xl font-bold text-teal-600">Tool Rental Application</h1>
      <p className="mb-8 text-lg text-gray-700">
        Welcome to our Tool Rental Service! Rent the tools you need for your next project.
      </p>
      <Link href="/check-out">

      <button className="rounded bg-teal-500 px-6 py-2 font-semibold text-white shadow transition duration-200 hover:bg-teal-600">
        Rent a Tool
      </button>
      </Link>
      <Link href="/agreement">
      <button className="mt-4 text-blue-500 hover:underline">View Rental History</button></Link>
    </div>
  )
}

export default Home
