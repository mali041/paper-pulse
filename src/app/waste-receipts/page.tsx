"use client";

import React, { useState } from "react";
import Link from "next/link";
import WasteReceiptList from "./waste-receipt-list/page";
import UpdateWasteReceiptForm from "./update-waste-receipt/page";
import { WasteReceipt } from "@/lib/features/waste-receipt/wasteReceiptSlice";

const WasteReceiptPage = () => {
  const [selectedWasteReceipt, setSelectedWasteReceipt] =
    useState<WasteReceipt | null>(null);

  const handleSelectWasteReceipt = (wasteReceipt: WasteReceipt) => {
    setSelectedWasteReceipt(wasteReceipt);
  };

  const handleCloseForm = () => {
    setSelectedWasteReceipt(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Waste Receipt</h1>
        <Link href="/waste-receipt/add-waste-receipt">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Waste Receipt
          </span>
        </Link>
      </div>
      {selectedWasteReceipt && (
        <UpdateWasteReceiptForm
          wasteReceipt={selectedWasteReceipt}
          onClose={handleCloseForm}
        />
      )}
      <WasteReceiptList onSelectWasteReceipt={handleSelectWasteReceipt} />
    </div>
  );
};

export default WasteReceiptPage;
