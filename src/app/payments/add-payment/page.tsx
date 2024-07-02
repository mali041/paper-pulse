"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPayment, Payment } from "@/lib/features/payment/paymentSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import LoadingAddPayment from "./loading";

type Inputs = Omit<Payment, "id" | "date">;

const AddPaymentForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");

  const [isPaymentAdded, setIsPaymentAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    const payment: Omit<Payment, "id"> = {
      ...data,
      amount: parseFloat(data.amount as unknown as string), // Ensure amount is a number
      date: new Date().toISOString(),
    };

    try {
      await dispatch(addPayment(payment));
      setIsPaymentAdded(true); // Set state to indicate payment added successfully
      reset(); // Reset form fields
    } catch (error) {
      setError("Failed to add payment. Please try again.");
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
        <Link href="/payments">
          <span className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <ArrowLeftIcon className="h-6 w-6 text-blue-600" />
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Payment
        </h1>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Type</label>
        <select
          {...register("type", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option
            value="credit"
            className="text-blue-600 font-semibold p-3 mb-2"
          >
            Credit
          </option>
          <option value="debit" className="text-red-600 font-semibold p-3">
            Debit
          </option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Sender Name</label>
        <input
          {...register("senderName", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Receiver Name</label>
        <input
          {...register("receiverName", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          step="0.01" // Allows floating-point numbers
          {...register("amount", { required: true })}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Date</label>
        <input
          type="text"
          value={dayjs().format("YYYY-MM-DD")}
          disabled
          className="border border-gray-300 p-3 w-full rounded bg-gray-100 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Add Payment
      </button>

      {isPaymentAdded && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Payment added successfully!
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

export default AddPaymentForm;
