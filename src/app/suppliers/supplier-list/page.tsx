"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  selectSuppliers,
  selectSupplierLoading,
  selectSupplierError,
  deleteSupplier,
  Supplier,
} from "@/lib/features/supplier/supplierSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import LoadingSupplierList from "./loading";

interface SupplierListProps {
  onSelectSupplier: (supplier: Supplier) => void;
}

const SupplierList: React.FC<SupplierListProps> = ({ onSelectSupplier }) => {
  const dispatch = useDispatch<AppDispatch>();
  const suppliers = useSelector<RootState, Supplier[]>(selectSuppliers);
  const loading = useSelector<RootState, boolean>(selectSupplierLoading);
  const error = useSelector<RootState, string | null>(selectSupplierError);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSupplier(Number(id)));
      dispatch(fetchSuppliers());
    } catch (error: any) {
      dispatch(setDeleteError(error.message || "Failed to delete supplier"));
    }
  };

  if (loading) return <LoadingSupplierList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Phone No</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{supplier.name}</td>
              <td className="py-3 px-4">{supplier.phoneNo}</td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(supplier.id.toString())}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectSupplier(supplier)}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;

function setDeleteError(arg0: any): any {
  throw new Error("Function not implemented.");
}
