"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateWasteReceived,
  WasteReceived,
} from "@/lib/features/waste-received/wasteReceivedSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";

type UpdateWasteReceivedFormProps = {
  wasteReceived: WasteReceived;
  onClose: () => void;
};

type Inputs = Omit<WasteReceived, "id">;

const UpdateWasteReceivedForm: React.FC<UpdateWasteReceivedFormProps> = ({
  wasteReceived,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue(
      "receiptDate",
      dayjs(wasteReceived.receiptDate).format("YYYY-MM-DD")
    );
    setValue("supplierId", wasteReceived.supplierId);
    setValue("vehicleNo", wasteReceived.vehicleNo);
    setValue("receiptId", wasteReceived.receiptId);
    setValue("wasteTypeId", wasteReceived.wasteTypeId);
    setValue("unitPrice", wasteReceived.unitPrice);
    setValue("netWeightOfWaste", wasteReceived.netWeightOfWaste);
    setValue("totalAmountOfWaste", wasteReceived.totalAmountOfWaste);
    setValue("paymentReceived", wasteReceived.paymentReceived);
    setValue("balance", wasteReceived.balance);
  }, [wasteReceived, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedWasteReceived: WasteReceived = {
      ...wasteReceived,
      ...data,
      unitPrice: parseFloat(data.unitPrice as unknown as string),
      netWeightOfWaste: parseFloat(data.netWeightOfWaste as unknown as string),
      totalAmountOfWaste: parseFloat(
        data.totalAmountOfWaste as unknown as string
      ),
      paymentReceived: parseFloat(data.paymentReceived as unknown as string),
      balance: parseFloat(data.balance as unknown as string),
      receiptDate: new Date(data.receiptDate).toISOString(),
    };
    dispatch(updateWasteReceived(updatedWasteReceived));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Waste Received</h1>
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
        <label className="block text-gray-700">Supplier ID</label>
        <input
          type="number"
          {...register("supplierId", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Vehicle No</label>
        <input
          type="text"
          {...register("vehicleNo", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Receipt ID</label>
        <input
          type="number"
          {...register("receiptId", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Waste Type ID</label>
        <input
          type="number"
          {...register("wasteTypeId", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Unit Price</label>
        <input
          type="number"
          step="0.01"
          {...register("unitPrice", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Net Weight Of Waste</label>
        <input
          type="number"
          step="0.01"
          {...register("netWeightOfWaste", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Total Amount Of Waste</label>
        <input
          type="number"
          step="0.01"
          {...register("totalAmountOfWaste", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Payment Received</label>
        <input
          type="number"
          step="0.01"
          {...register("paymentReceived", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Balance</label>
        <input
          type="number"
          step="0.01"
          {...register("balance", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Waste Received
      </button>
    </form>
  );
};

export default UpdateWasteReceivedForm;
