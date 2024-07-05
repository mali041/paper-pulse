"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addWasteStack,
  WasteStack,
} from "@/lib/features/waste-stack/wasteStackSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingAddWasteStack from "./loading";

type Inputs = Omit<WasteStack, "id">;

const AddWasteStackForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [isWasteStackAdded, setIsWasteStackAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const wasteStack: Omit<WasteStack, "id"> = {
      ...data,
      stackNo: parseInt(data.stackNo as unknown as string, 10), // Ensure stackNo is a number
      wasteTypeId: parseInt(data.wasteTypeId as unknown as string, 10), // Ensure wasteTypeId is a number
      totalQuantity: parseFloat(data.totalQuantity as unknown as string), // Ensure totalQuantity is a number
    };

    try {
      await dispatch(addWasteStack(wasteStack));
      setIsWasteStackAdded(true);
      reset();
    } catch (error) {
      setError("Failed to add waste stack. Please try again.");
      console.error("Error adding waste stack:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAddWasteStack />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Link href="/waste-stack">
          <span className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Waste Stack
        </h1>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Stack No</label>
        <input
          type="number"
          {...register("stackNo", { required: true })}
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
        <label className="block text-gray-700 mb-2">Total Quantity</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("totalQuantity", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Add Waste Stack
      </button>

      {isWasteStackAdded && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Waste stack added successfully!
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

export default AddWasteStackForm;
