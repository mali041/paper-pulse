"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addWasteReceipt,
  WasteReceipt,
} from "@/lib/features/waste-receipt/wasteReceiptSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingAddPayment from "./loading";

type Inputs = Omit<WasteReceipt, "id">;

const AddWasteReceiptForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");

  const [isWasteReceiptAdded, setIsWasteReceiptAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const wasteReceipt: Omit<WasteReceipt, "id"> = {
      ...data,
      supplierId: parseInt(data.supplierId as unknown as string, 10), // Ensure supplierId is a number
      wasteTypeId: parseInt(data.wasteTypeId as unknown as string, 10), // Ensure wasteTypeId is a number
      stackNo: parseInt(data.stackNo as unknown as string, 10), // Ensure stackNo is a number
      vehicleWeightWithWaste: parseFloat(
        data.vehicleWeightWithWaste as unknown as string
      ), // Ensure vehicleWeightWithWaste is a number
      vehicleWeightWithoutWaste: parseFloat(
        data.vehicleWeightWithoutWaste as unknown as string
      ), // Ensure vehicleWeightWithoutWaste is a number
      netWeightOfWaste: parseFloat(data.netWeightOfWaste as unknown as string), // Ensure netWeightOfWaste is a number
      unitPrice: parseFloat(data.unitPrice as unknown as string), // Ensure unitPrice is a number
      receiptDate: new Date().toISOString(),
    };

    try {
      await dispatch(addWasteReceipt(wasteReceipt));
      setIsWasteReceiptAdded(true); // Set state to indicate waste receipt added successfully
      reset(); // Reset form fields
    } catch (error) {
      setError("Failed to add waste receipt. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAddPayment />;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Link href="/waste-receipts">
          <span className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Waste Receipt
        </h1>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Receipt Date</label>
        <input
          type="text"
          value={dayjs().format("YYYY-MM-DD")}
          disabled
          className="border border-gray-300 p-3 w-full rounded bg-gray-100 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Supplier ID</label>
        <input
          {...register("supplierId", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Vehicle No</label>
        <input
          {...register("vehicleNo", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Waste Type ID</label>
        <input
          {...register("wasteTypeId", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Stack No</label>
        <input
          {...register("stackNo", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Vehicle Weight With Waste
        </label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("vehicleWeightWithWaste", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Vehicle Weight Without Waste
        </label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("vehicleWeightWithoutWaste", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Net Weight Of Waste</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("netWeightOfWaste", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Unit Price</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("unitPrice", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Add Waste Receipt
      </button>

      {isWasteReceiptAdded && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Waste receipt added successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </form>
  );
};

export default AddWasteReceiptForm;
