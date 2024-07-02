import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Payment {
  id: string;
  date: string;
  type: string;
  senderName: string;
  amount: number;
  receiverName: string;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchPayments = createAsyncThunk('payments/fetchPayments', async () => {
  const response = await fetch('/api/payments');
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return await response.json();
});

const fetchPayment = createAsyncThunk('payments/fetchPayments', async (id: string) => {
  const response = await fetch(`/api/payments/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch payments');
  }
  return await response.json();
});

const addPayment = createAsyncThunk('payments/addPayment', async (payment: Omit<Payment, 'id'>) => {
  console.log("Payment data to be sent:", payment);
  const response = await fetch('/api/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });
  if (!response.ok) {
    throw new Error('Failed to add payment');
  }
  return await response.json();
});

const updatePayment = createAsyncThunk('payments/updatePayment', async (payment: Payment) => {
  const response = await fetch(`/api/payments/${payment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payment),
  });
  if (!response.ok) {
    throw new Error('Failed to update payment');
  }
  return await response.json();
});

const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }
      return id.toString(); // Return the deleted payment ID as string if successful
    } catch (error: any) {
      return rejectWithValue(error.message as Error); // Return error message on failure
    }
  }
);


const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.payments = action.payload;
        state.loading = false;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payments';
      })
      .addCase(addPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.payments.push(action.payload);
        state.loading = false;
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add payment';
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        const index = state.payments.findIndex((payment) => payment.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update payment';
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action: PayloadAction<string>) => {
        state.payments = state.payments.filter((payment) => payment.id !== action.payload);
        state.loading = false;
        state.error = null;
      }).addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message?.includes('Invalid payment ID')) {
          state.error = 'Invalid payment ID provided. Please check and try again.';
        } else {
          state.error = action.error.message || 'Failed to delete payment';
        }
      })
      
  },
});

export default paymentSlice.reducer;

// Exporting async thunks for use in components
export { fetchPayments, fetchPayment, addPayment, updatePayment, deletePayment };

// Selectors
export const selectPayments = (state: RootState) => state.payment.payments;
export const selectPaymentLoading = (state: RootState) => state.payment.loading;
export const selectPaymentError = (state: RootState) => state.payment.error;
