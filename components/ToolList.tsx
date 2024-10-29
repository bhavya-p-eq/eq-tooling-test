// // components/ToolList.tsx
// import { Tool } from '../types/tool';

// interface ToolListProps {
//   tools: Tool[];
// }

// const ToolList: React.FC<ToolListProps> = ({ tools }) => {
//   return (
//     <div className="space-y-4">
//       {tools.map(tool => (
//         <div key={tool.id} className="p-4 border border-gray-300 rounded shadow-sm transition-transform transform hover:scale-105">
//           <h2 className="font-bold text-lg">{tool.name}</h2>
//           <p className="text-gray-600">Code: <span className="font-semibold">{tool.code}</span></p>
//           <p className="text-gray-600">Type: <span className="font-semibold">{tool.type}</span></p>
//           <p>Daily Rate: <span className="font-semibold">${tool.dailyRate}</span></p>
//           {tool.isFreeOnWeekends && <p className="text-green-500">(Free on weekends)</p>}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ToolList;
