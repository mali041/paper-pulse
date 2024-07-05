import React from "react";

const LoadingWasteReceivedList: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center animate-pulse">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Receipt Date</th>
            <th className="py-3 px-4 border-b border-gray-200">Supplier ID</th>
            <th className="py-3 px-4 border-b border-gray-200">Vehicle No</th>
            <th className="py-3 px-4 border-b border-gray-200">Receipt ID</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Waste Type ID
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Unit Price</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Net Weight Of Waste
            </th>
            <th className="py-3 px-4 border-b border-gray-200">
              Total Amount Of Waste
            </th>
            <th className="py-3 px-4 border-b border-gray-200">
              Payment Received
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Balance</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 animate-pulse">Loading...</td>
              <td className="py-3 px-4 flex justify-center items-center animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse ml-2"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingWasteReceivedList;
