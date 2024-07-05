"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateWasteStack,
  WasteStack,
} from "@/lib/features/waste-stack/wasteStackSlice";
import { AppDispatch } from "@/lib/store";
import dayjs from "dayjs";

type UpdateWasteStackFormProps = {
  wasteStack: WasteStack;
  onClose: () => void;
};

type Inputs = Omit<WasteStack, "id">;

const UpdateWasteStackForm: React.FC<UpdateWasteStackFormProps> = ({
  wasteStack,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("stackNo", wasteStack.stackNo);
    setValue("wasteTypeId", wasteStack.wasteTypeId);
    setValue("totalQuantity", wasteStack.totalQuantity);
  }, [wasteStack, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedWasteStack: WasteStack = {
      ...wasteStack,
      ...data,
      totalQuantity: parseFloat(data.totalQuantity as unknown as string),
    };
    dispatch(updateWasteStack(updatedWasteStack));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Waste Stack</h1>
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
        <label className="block text-gray-700">Total Quantity</label>
        <input
          type="number"
          step="0.01"
          {...register("totalQuantity", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Waste Stack
      </button>
    </form>
  );
};

export default UpdateWasteStackForm;
