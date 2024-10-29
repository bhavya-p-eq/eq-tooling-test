// "use client";
// import { useEffect, useState } from 'react';
// import ToolList from '../components/ToolList';
import RentalForm from '../components/RentalForm';
// import { Tool } from '../types/tool';

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
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">Tool Rental Application</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* <ToolList tools={tools} /> */}
        <RentalForm />
      </div>
    </div>
  );
};

export default Home;
