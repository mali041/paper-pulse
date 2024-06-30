"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "../lib/hooks";
import { RootState } from "../lib/store";
import { fetchPayments } from "../lib/features/payment/paymentSlice";
import PaymentsList from "./components/payments";

export default function Home() {
  const payments = useSelector((state: RootState) => state.payment.payments);
  const loading = useSelector((state: RootState) => state.payment.loading);
  const error = useSelector((state: RootState) => state.payment.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Payments</h1>
      <PaymentsList />
    </main>
  );
}
