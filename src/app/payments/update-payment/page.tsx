"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePayment, Payment } from "@/lib/features/payment/paymentSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";
import LoadingUpdatePayment from "./loading";

type UpdatePaymentFormProps = {
  payment: Payment;
  onClose: () => void;
};

type Inputs = Omit<Payment, "id" | "date">;

const UpdatePaymentForm: React.FC<UpdatePaymentFormProps> = ({
  payment,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("type", payment.type);
    setValue("senderName", payment.senderName);
    setValue("receiverName", payment.receiverName);
    setValue("amount", payment.amount);
  }, [payment, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedPayment: Payment = {
      ...payment,
      ...data,
      amount: parseFloat(data.amount as unknown as string),
      date: new Date().toISOString(),
    };
    dispatch(updatePayment(updatedPayment));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Payment</h1>
      <div>
        <label className="block text-gray-700">Type</label>
        <select
          {...register("type", { required: true })}
          className="border p-2 w-full rounded"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Sender Name</label>
        <input
          {...register("senderName", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Receiver Name</label>
        <input
          {...register("receiverName", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Date</label>
        <input
          type="text"
          value={dayjs().format("YYYY-MM-DD")}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Payment
      </button>
    </form>
  );
};

export default UpdatePaymentForm;
