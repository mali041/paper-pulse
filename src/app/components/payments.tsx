// components/payments/PaymentsList.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPayments,
  selectPayments,
  selectPaymentLoading,
  selectPaymentError,
} from "../../lib/features/payment/paymentSlice";

const PaymentsList = () => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayments);
  const loading = useSelector(selectPaymentLoading);
  const error = useSelector(selectPaymentError);

  useEffect(() => {
    dispatch(fetchPayments() as any);
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {payments.map((payment) => (
        <div key={payment.id}>
          <p>
            {payment.senderName} paid {payment.receiverName} {payment.amount} on{" "}
            {new Date(payment.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PaymentsList;
