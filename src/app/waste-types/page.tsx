"use client";

import React, { useState } from "react";
import Link from "next/link";
import WasteTypeList from "./waste-type-list/page";
import UpdateWasteTypeForm from "./update-waste-type/page";
import { WasteType } from "@/lib/features/waste-type/wasteTypeSlice";

const WasteTypesPage = () => {
  const [selectedWasteType, setSelectedWasteType] = useState<WasteType | null>(
    null
  );

  const handleSelectWasteType = (wasteType: WasteType) => {
    setSelectedWasteType(wasteType);
  };

  const handleCloseForm = () => {
    setSelectedWasteType(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Waste Types</h1>
        <Link href="/waste-types/add-waste-type">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Waste Type
          </span>
        </Link>
      </div>
      {selectedWasteType && (
        <UpdateWasteTypeForm
          wasteType={selectedWasteType}
          onClose={handleCloseForm}
        />
      )}
      <WasteTypeList onSelectWasteType={handleSelectWasteType} />
    </div>
  );
};

export default WasteTypesPage;
