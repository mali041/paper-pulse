// src/app/waste-stack/page.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import WasteStackList from "./waste-stack-list/page";
import UpdateWasteStackForm from "./update-waste-stack/page";
import { WasteStack } from "@/lib/features/waste-stack/wasteStackSlice";

const WasteStackPage = () => {
  const [selectedWasteStack, setSelectedWasteStack] =
    useState<WasteStack | null>(null);

  const handleSelectWasteStack = (wasteStack: WasteStack) => {
    setSelectedWasteStack(wasteStack);
  };

  const handleCloseForm = () => {
    setSelectedWasteStack(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Waste Stack</h1>
        <Link href="/waste-stack/add-waste-stack">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Waste Stack
          </span>
        </Link>
      </div>
      {selectedWasteStack && (
        <UpdateWasteStackForm
          wasteStack={selectedWasteStack}
          onClose={handleCloseForm}
        />
      )}
      <WasteStackList onSelectWasteStack={handleSelectWasteStack} />
    </div>
  );
};

export default WasteStackPage;
