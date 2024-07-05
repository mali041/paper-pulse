"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWasteStacks,
  selectWasteStacks,
  selectWasteStackLoading,
  selectWasteStackError,
  deleteWasteStack,
  WasteStack,
} from "@/lib/features/waste-stack/wasteStackSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"; // Import icons
import LoadingWasteStackList from "./loading";

interface WasteStackListProps {
  onSelectWasteStack: (wasteStack: WasteStack) => void;
}

const WasteStackList: React.FC<WasteStackListProps> = ({
  onSelectWasteStack,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wasteStacks = useSelector<RootState, WasteStack[]>(selectWasteStacks);
  const loading = useSelector<RootState, boolean>(selectWasteStackLoading);
  const error = useSelector<RootState, string | null>(selectWasteStackError);

  useEffect(() => {
    dispatch(fetchWasteStacks());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWasteStack(Number(id)));
      dispatch(fetchWasteStacks());
    } catch (error: any) {
      console.error("Error deleting waste stack:", error);
    }
  };

  if (loading) return <LoadingWasteStackList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Stack No</th>
            <th className="py-3 px-4 border-b border-gray-200">Waste Type</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Total Quantity
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteStacks.map((wasteStack) => (
            <tr key={wasteStack.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{wasteStack.stackNo}</td>
              <td className="py-3 px-4">{wasteStack.wasteTypeId}</td>
              <td className="py-3 px-4">{wasteStack.totalQuantity}</td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(wasteStack.id.toString())}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectWasteStack(wasteStack)}
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

export default WasteStackList;
