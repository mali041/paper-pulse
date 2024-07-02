import React from "react";

const LoadingUpdatePayment: React.FC = () => {
  return (
    <form className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded animate-pulse">
      <div className="animate-pulse">
        <div className="w-1/2 h-6 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="animate-pulse">
        <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </form>
  );
};

export default LoadingUpdatePayment;
