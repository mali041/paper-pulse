"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWasteReceived,
  selectWasteReceived,
  selectWasteReceivedLoading,
  selectWasteReceivedError,
  deleteWasteReceived,
  WasteReceived,
} from "@/lib/features/waste-received/wasteReceivedSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import LoadingWasteReceivedList from "./loading";

interface WasteReceivedListProps {
  onSelectWasteReceived: (wasteReceived: WasteReceived) => void;
}

const WasteReceivedList: React.FC<WasteReceivedListProps> = ({
  onSelectWasteReceived,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wasteReceived = useSelector<RootState, WasteReceived[]>(
    selectWasteReceived
  );
  const loading = useSelector<RootState, boolean>(selectWasteReceivedLoading);
  const error = useSelector<RootState, string | null>(selectWasteReceivedError);

  useEffect(() => {
    dispatch(fetchWasteReceived());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWasteReceived(Number(id)));
      dispatch(fetchWasteReceived());
    } catch (error: any) {
      console.error("Error deleting waste received:", error);
    }
  };

  if (loading) return <LoadingWasteReceivedList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Receipt Date</th>
            <th className="py-3 px-4 border-b border-gray-200">Supplier ID</th>
            <th className="py-3 px-4 border-b border-gray-200">Vehicle No</th>
            <th className="py-3 px-4 border-b border-gray-200">Receipt ID</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Waste Type ID
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Unit Price</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Net Weight Of Waste
            </th>
            <th className="py-3 px-4 border-b border-gray-200">
              Total Amount Of Waste
            </th>
            <th className="py-3 px-4 border-b border-gray-200">
              Payment Received
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Balance</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteReceived.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-3 px-4">
                {new Date(item.receiptDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{item.supplierId}</td>
              <td className="py-3 px-4">{item.vehicleNo}</td>
              <td className="py-3 px-4">{item.receiptId}</td>
              <td className="py-3 px-4">{item.wasteTypeId}</td>
              <td className="py-3 px-4">{item.unitPrice}</td>
              <td className="py-3 px-4">{item.netWeightOfWaste}</td>
              <td className="py-3 px-4">{item.totalAmountOfWaste}</td>
              <td className="py-3 px-4">{item.paymentReceived}</td>
              <td className="py-3 px-4">{item.balance}</td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(item.id.toString())}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectWasteReceived(item)}
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

export default WasteReceivedList;
