"use client";

import React, { useState } from "react";
import Link from "next/link";
import SupplierList from "./supplier-list/page";
import UpdateSupplierForm from "./update-supplier/page";
import { Supplier } from "@/lib/features/supplier/supplierSlice";

const SuppliersPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const handleSelectSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleCloseForm = () => {
    setSelectedSupplier(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Suppliers</h1>
        <Link href="/suppliers/add-supplier">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Supplier
          </span>
        </Link>
      </div>
      {selectedSupplier && (
        <UpdateSupplierForm
          supplier={selectedSupplier}
          onClose={handleCloseForm}
        />
      )}
      <SupplierList onSelectSupplier={handleSelectSupplier} />
    </div>
  );
};

export default SuppliersPage;
