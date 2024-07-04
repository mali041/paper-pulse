"use client";

import React, { useState } from "react";
import Link from "next/link";
import WasteUsageList from "./waste-usage-list/page";
import UpdateWasteUsageForm from "./update-waste-usage/page";
import { WasteUsage } from "@/lib/features/waste-usage/wasteUsageSlice";

const WasteUsagePage = () => {
  const [selectedWasteUsage, setSelectedWasteUsage] =
    useState<WasteUsage | null>(null);

  const handleSelectWasteUsage = (wasteUsage: WasteUsage) => {
    setSelectedWasteUsage(wasteUsage);
  };

  const handleCloseForm = () => {
    setSelectedWasteUsage(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Waste Usage</h1>
        <Link href="/waste-usage/add-waste-usage">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Waste Usage
          </span>
        </Link>
      </div>
      {selectedWasteUsage && (
        <UpdateWasteUsageForm
          wasteUsage={selectedWasteUsage}
          onClose={handleCloseForm}
        />
      )}
      <WasteUsageList onSelectWasteUsage={handleSelectWasteUsage} />
    </div>
  );
};

export default WasteUsagePage;
