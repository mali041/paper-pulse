"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWasteUsages,
  selectWasteUsages,
  selectWasteUsageLoading,
  selectWasteUsageError,
  deleteWasteUsage,
  WasteUsage,
} from "@/lib/features/waste-usage/wasteUsageSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"; // Import icons
import LoadingWasteUsageList from "./loading";

interface WasteUsageListProps {
  onSelectWasteUsage: (wasteUsage: WasteUsage) => void;
}

const WasteUsageList: React.FC<WasteUsageListProps> = ({
  onSelectWasteUsage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wasteUsages = useSelector<RootState, WasteUsage[]>(selectWasteUsages);
  const loading = useSelector<RootState, boolean>(selectWasteUsageLoading);
  const error = useSelector<RootState, string | null>(selectWasteUsageError);

  useEffect(() => {
    dispatch(fetchWasteUsages());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWasteUsage(Number(id)));
      dispatch(fetchWasteUsages());
    } catch (error: any) {
      console.error("Error deleting waste usage:", error);
      // Handle error as needed, such as displaying a notification or retrying
    }
  };

  if (loading) return <LoadingWasteUsageList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Stack No</th>
            <th className="py-3 px-4 border-b border-gray-200">Waste Type</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Used Quantity
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Usage Date</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteUsages.map((wasteUsage) => (
            <tr key={wasteUsage.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{wasteUsage.stackNo}</td>
              <td className="py-3 px-4">{wasteUsage.wasteTypeId}</td>
              <td className="py-3 px-4">{wasteUsage.usedQuantity}</td>
              <td className="py-3 px-4">
                {new Date(wasteUsage.usageDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(wasteUsage.id.toString())}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectWasteUsage(wasteUsage)}
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

export default WasteUsageList;
