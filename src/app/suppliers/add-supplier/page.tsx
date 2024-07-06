"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSupplier, Supplier } from "@/lib/features/supplier/supplierSlice";
import { AppDispatch } from "@/lib/store";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingAddSupplier from "./loading";

type Inputs = Omit<Supplier, "id">;

const AddSupplierForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");
  const [isSupplierAdded, setIsSupplierAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      await dispatch(addSupplier(data));
      setIsSupplierAdded(true);
      reset(); // Reset form fields
    } catch (error) {
      setError("Failed to add supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingAddSupplier />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
    >
      <div className="flex items-center mb-6">
        <Link href="/suppliers">
          <span className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Supplier
        </h1>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          {...register("name", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Phone Number</label>
        <input
          {...register("phoneNo", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Add Supplier
      </button>

      {isSupplierAdded && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Supplier added successfully!
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

export default AddSupplierForm;
