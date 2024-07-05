"use client";

import React, { useState } from "react";
import Link from "next/link";
import WasteReceivedList from "./waste-received-list/page";
import UpdateWasteReceivedForm from "./update-waste-received/page";
import { WasteReceived } from "@/lib/features/waste-received/wasteReceivedSlice";

const WasteReceivedPage = () => {
  const [selectedWasteReceived, setSelectedWasteReceived] =
    useState<WasteReceived | null>(null);

  const handleSelectWasteReceived = (wasteReceived: WasteReceived) => {
    setSelectedWasteReceived(wasteReceived);
  };

  const handleCloseForm = () => {
    setSelectedWasteReceived(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Waste Received</h1>
        <Link href="/waste-received/add-waste-received">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Waste Received
          </span>
        </Link>
      </div>
      {selectedWasteReceived && (
        <UpdateWasteReceivedForm
          wasteReceived={selectedWasteReceived}
          onClose={handleCloseForm}
        />
      )}
      <WasteReceivedList onSelectWasteReceived={handleSelectWasteReceived} />
    </div>
  );
};

export default WasteReceivedPage;
