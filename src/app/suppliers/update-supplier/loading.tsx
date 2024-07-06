import React from "react";

const LoadingUpdateSupplier: React.FC = () => {
  return (
    <form className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg animate-pulse">
      <div className="animate-pulse">
        <div className="w-1/2 h-6 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <button className="px-4 py-3 bg-gray-200 text-white rounded w-full"></button>
    </form>
  );
};

export default LoadingUpdateSupplier;
