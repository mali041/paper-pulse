"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  updateSupplier,
  Supplier,
} from "@/lib/features/supplier/supplierSlice";
import { AppDispatch } from "@/lib/store";
import LoadingUpdateSupplier from "./loading";

type UpdateSupplierFormProps = {
  supplier: Supplier;
  onClose: () => void;
};

type Inputs = Omit<Supplier, "id">;

const UpdateSupplierForm: React.FC<UpdateSupplierFormProps> = ({
  supplier,
  onClose,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setValue("name", supplier.name);
    setValue("phoneNo", supplier.phoneNo);
  }, [supplier, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedSupplier: Supplier = {
      ...supplier,
      ...data,
    };
    dispatch(updateSupplier(updatedSupplier));
    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto bg-white p-6 shadow-md rounded"
    >
      <h1 className="text-2xl mb-4 text-center">Update Supplier</h1>
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          {...register("name", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Phone Number</label>
        <input
          {...register("phoneNo", { required: true })}
          className="border p-2 w-full rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
      >
        Update Supplier
      </button>
    </form>
  );
};

export default UpdateSupplierForm;
