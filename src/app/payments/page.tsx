"use client";

import React, { useState } from "react";
import Link from "next/link";
import PaymentList from "./payment-list/page";
import UpdatePaymentForm from "./update-payment/page";
import { Payment } from "@/lib/features/payment/paymentSlice";

const PaymentsPage = () => {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const handleSelectPayment = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseForm = () => {
    setSelectedPayment(null);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-12 py-4 sm:py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-3xl font-bold">Payments</h1>
        <Link href="/payments/add-payment">
          <span className="px-3 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition ease-in-out duration-150">
            Add Payment
          </span>
        </Link>
      </div>
      {selectedPayment && (
        <UpdatePaymentForm
          payment={selectedPayment}
          onClose={handleCloseForm}
        />
      )}
      <PaymentList onSelectPayment={handleSelectPayment} />
    </div>
  );
};

export default PaymentsPage;
