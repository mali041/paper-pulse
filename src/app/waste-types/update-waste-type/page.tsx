"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateWasteType,
  WasteType,
} from "@/lib/features/waste-type/wasteTypeSlice";
import { AppDispatch } from "@/lib/store";
import LoadingUpdateWasteType from "./loading";

type UpdateWasteTypeFormProps = {
  wasteType: WasteType;
  onClose: () => void;
};

type Inputs = Omit<WasteType, "id">;

const UpdateWasteTypeForm: React.FC<UpdateWasteTypeFormProps> = ({
  wasteType,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("name", wasteType.name);
  }, [wasteType, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedWasteType: WasteType = {
      ...wasteType,
      ...data,
    };
    dispatch(updateWasteType(updatedWasteType));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Waste Type</h1>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          {...register("name", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Waste Type
      </button>
    </form>
  );
};

export default UpdateWasteTypeForm;
