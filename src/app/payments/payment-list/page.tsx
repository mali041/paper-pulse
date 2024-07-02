"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  selectPayments,
  selectPaymentLoading,
  selectPaymentError,
  deletePayment,
  Payment,
} from "@/lib/features/payment/paymentSlice";
import { RootState, AppDispatch } from "@/lib/store";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"; // Import icons
import LoadingPaymentList from "./loading";

interface PaymentListProps {
  onSelectPayment: (payment: Payment) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ onSelectPayment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const payments = useSelector<RootState, Payment[]>(selectPayments);
  const loading = useSelector<RootState, boolean>(selectPaymentLoading);
  const error = useSelector<RootState, string | null>(selectPaymentError);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deletePayment(Number(id)));

      dispatch(fetchPayments());
    } catch (error: any) {
      dispatch(setDeleteError(error.message || "Failed to delete payment"));
    }
  };

  if (loading) return <LoadingPaymentList />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg overflow-hidden text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-gray-200">Sender Name</th>
            <th className="py-3 px-4 border-b border-gray-200">
              Receiver Name
            </th>
            <th className="py-3 px-4 border-b border-gray-200">Amount</th>
            <th className="py-3 px-4 border-b border-gray-200">Date</th>
            <th className="py-3 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-gray-200">
              <td className="py-3 px-4">{payment.senderName}</td>
              <td className="py-3 px-4">{payment.receiverName}</td>
              <td className="py-3 px-4">{payment.amount}</td>
              <td className="py-3 px-4">
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 flex justify-center space-x-2 items-center">
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onSelectPayment(payment)}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
function setDeleteError(arg0: any): any {
  throw new Error("Function not implemented.");
}
