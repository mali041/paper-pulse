"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateWasteReceipt,
  WasteReceipt,
} from "@/lib/features/waste-receipt/wasteReceiptSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";

type UpdateWasteReceiptFormProps = {
  wasteReceipt: WasteReceipt;
  onClose: () => void;
};

type Inputs = Omit<WasteReceipt, "id">;

const UpdateWasteReceiptForm: React.FC<UpdateWasteReceiptFormProps> = ({
  wasteReceipt,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue(
      "receiptDate",
      dayjs(wasteReceipt.receiptDate).format("YYYY-MM-DD")
    );
    setValue("supplierId", wasteReceipt.supplierId);
    setValue("vehicleNo", wasteReceipt.vehicleNo);
    setValue("wasteTypeId", wasteReceipt.wasteTypeId);
    setValue("stackNo", wasteReceipt.stackNo);
    setValue("vehicleWeightWithWaste", wasteReceipt.vehicleWeightWithWaste);
    setValue(
      "vehicleWeightWithoutWaste",
      wasteReceipt.vehicleWeightWithoutWaste
    );
    setValue("netWeightOfWaste", wasteReceipt.netWeightOfWaste);
    setValue("unitPrice", wasteReceipt.unitPrice);
  }, [wasteReceipt, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedWasteReceipt: WasteReceipt = {
      ...wasteReceipt,
      ...data,
      supplierId: parseInt(data.supplierId as unknown as string, 10),
      wasteTypeId: parseInt(data.wasteTypeId as unknown as string, 10),
      vehicleWeightWithWaste: parseFloat(
        data.vehicleWeightWithWaste as unknown as string
      ),
      vehicleWeightWithoutWaste: parseFloat(
        data.vehicleWeightWithoutWaste as unknown as string
      ),
      netWeightOfWaste: parseFloat(data.netWeightOfWaste as unknown as string),
      unitPrice: parseFloat(data.unitPrice as unknown as string),
      receiptDate: new Date().toISOString(),
    };
    dispatch(updateWasteReceipt(updatedWasteReceipt));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Waste Receipt</h1>
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
        <label className="block text-gray-700 mb-2">Waste Type ID</label>
        <input
          type="number"
          {...register("wasteTypeId", { required: true })}
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
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Waste Receipt
      </button>
    </form>
  );
};

export default UpdateWasteReceiptForm;
