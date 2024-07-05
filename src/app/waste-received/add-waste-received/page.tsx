"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addWasteReceived,
  WasteReceived,
} from "@/lib/features/waste-received/wasteReceivedSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import LoadingAddWasteReceived from "./loading";

type Inputs = Omit<WasteReceived, "id">;

const AddWasteReceivedForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isWasteReceivedAdded, setIsWasteReceivedAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const wasteReceived: Omit<WasteReceived, "id"> = {
      ...data,
      supplierId: parseInt(data.supplierId as unknown as string, 10), // Ensure supplierId is a number
      receiptId: parseInt(data.receiptId as unknown as string, 10), // Ensure receiptId is a number
      wasteTypeId: parseInt(data.wasteTypeId as unknown as string, 10), // Ensure wasteTypeId is a number
      unitPrice: parseFloat(data.unitPrice as unknown as string), // Ensure unitPrice is a number
      netWeightOfWaste: parseFloat(data.netWeightOfWaste as unknown as string), // Ensure netWeightOfWaste is a number
      totalAmountOfWaste: parseFloat(
        data.totalAmountOfWaste as unknown as string
      ), // Ensure totalAmountOfWaste is a number
      paymentReceived: parseFloat(data.paymentReceived as unknown as string), // Ensure paymentReceived is a number
      balance: parseFloat(data.balance as unknown as string), // Ensure balance is a number
      receiptDate: new Date(data.receiptDate).toISOString(), // Ensure receiptDate is a valid date string
    };

    try {
      await dispatch(addWasteReceived(wasteReceived));
      setIsWasteReceivedAdded(true);
      reset();
    } catch (error) {
      setError("Failed to add waste received. Please try again.");
      console.error("Error adding waste received:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAddWasteReceived />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Link href="/waste-received">
          <span className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Waste Received
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
          type="number"
          {...register("supplierId", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Vehicle No</label>
        <input
          type="text"
          {...register("vehicleNo", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Receipt ID</label>
        <input
          type="number"
          {...register("receiptId", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Waste Type ID</label>
        <input
          type="number"
          {...register("wasteTypeId", { required: true })}
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
        <label className="block text-gray-700 mb-2">
          Total Amount Of Waste
        </label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("totalAmountOfWaste", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Payment Received</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("paymentReceived", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Balance</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("balance", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Add Waste Received
      </button>

      {isWasteReceivedAdded && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Waste received added successfully!
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

export default AddWasteReceivedForm;
