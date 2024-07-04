"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateWasteUsage,
  WasteUsage,
} from "@/lib/features/waste-usage/wasteUsageSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";
import LoadingUpdateWasteUsage from "./loading";

type UpdateWasteUsageFormProps = {
  wasteUsage: WasteUsage;
  onClose: () => void;
};

type Inputs = Omit<WasteUsage, "id" | "usageDate">;

const UpdateWasteUsageForm: React.FC<UpdateWasteUsageFormProps> = ({
  wasteUsage,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("stackNo", wasteUsage.stackNo);
    setValue("wasteTypeId", wasteUsage.wasteTypeId);
    setValue("usedQuantity", wasteUsage.usedQuantity);
  }, [wasteUsage, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedWasteUsage: WasteUsage = {
      ...wasteUsage,
      ...data,
      usedQuantity: parseFloat(data.usedQuantity as unknown as string),
      usageDate: new Date().toISOString(),
    };
    dispatch(updateWasteUsage(updatedWasteUsage));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Waste Usage</h1>
      <div>
        <label className="block text-gray-700">Stack No</label>
        <input
          {...register("stackNo", { required: true })}
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
        <label className="block text-gray-700">Used Quantity</label>
        <input
          type="number"
          step="0.01"
          {...register("usedQuantity", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Usage Date</label>
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
        Update Waste Usage
      </button>
    </form>
  );
};

export default UpdateWasteUsageForm;
