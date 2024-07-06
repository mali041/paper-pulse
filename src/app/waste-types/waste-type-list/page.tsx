"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWasteTypes,
  selectWasteTypes,
  selectWasteTypeLoading,
  selectWasteTypeError,
  deleteWasteType,
  WasteType,
} from "@/lib/features/waste-type/wasteTypeSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import LoadingWasteTypeList from "./loading";

interface WasteTypeListProps {
  onSelectWasteType: (wasteType: WasteType) => void;
}

const WasteTypeList: React.FC<WasteTypeListProps> = ({ onSelectWasteType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const wasteTypes = useSelector<RootState, WasteType[]>(selectWasteTypes);
  const loading = useSelector<RootState, boolean>(selectWasteTypeLoading);
  const error = useSelector<RootState, string | null>(selectWasteTypeError);

  useEffect(() => {
    dispatch(fetchWasteTypes());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/waste-types/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete waste type");
      }

      await dispatch(deleteWasteType(id));
      dispatch(fetchWasteTypes());
    } catch (error: any) {
      console.error("Failed to delete waste type:", error);
      alert(`Failed to delete waste type: ${error.message}`);
    }
  };

  if (loading) return <LoadingWasteTypeList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Name</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteTypes.map((wasteType) => (
            <tr key={wasteType.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{wasteType.name}</td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(wasteType.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectWasteType(wasteType)}
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

export default WasteTypeList;
