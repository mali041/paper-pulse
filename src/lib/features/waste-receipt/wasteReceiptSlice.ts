import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface WasteReceipt {
  id: number;
  receiptDate: string;
  supplierId: number;
  vehicleNo: string;
  wasteTypeId: number;
  stackNo: number;
  vehicleWeightWithWaste: number;
  vehicleWeightWithoutWaste: number;
  netWeightOfWaste: number;
  unitPrice: number;
}

interface WasteReceiptState {
  wasteReceipts: WasteReceipt[];
  loading: boolean;
  error: string | null;
}

const initialState: WasteReceiptState = {
  wasteReceipts: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchWasteReceipts = createAsyncThunk('wasteReceipt/fetchWasteReceipts', async () => {
  const response = await fetch('/api/waste-receipts');
  if (!response.ok) {
    throw new Error('Failed to fetch waste receipts');
  }
  return await response.json();
});

const fetchWasteReceipt = createAsyncThunk('wasteReceipt/fetchWasteReceipt', async (id: string) => {
  const response = await fetch(`/api/waste-receipts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch waste receipt');
  }
  return await response.json();
});

const addWasteReceipt = createAsyncThunk('wasteReceipt/addWasteReceipt', async (wasteReceipt: Omit<WasteReceipt, 'id'>) => {
  console.log("wasteReceived data to be sent:", wasteReceipt);
  const response = await fetch('/api/waste-receipts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteReceipt),
  });
  if (!response.ok) {
    throw new Error('Failed to add waste receipt');
  }
  return await response.json();
});

const updateWasteReceipt = createAsyncThunk('wasteReceipt/updateWasteReceipt', async (wasteReceipt: WasteReceipt) => {
  const response = await fetch(`/api/waste-receipts/${wasteReceipt.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteReceipt),
  });
  if (!response.ok) {
    throw new Error('Failed to update waste receipt');
  }
  return await response.json();
});

const deleteWasteReceipt = createAsyncThunk('wasteReceipt/deleteWasteReceipt', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/waste-receipts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete waste receipt');
    }
    return id; // Return the deleted waste receipt ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const wasteReceiptSlice = createSlice({
  name: 'wasteReceipt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWasteReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteReceipts.fulfilled, (state, action: PayloadAction<WasteReceipt[]>) => {
        state.wasteReceipts = action.payload;
        state.loading = false;
      })
      .addCase(fetchWasteReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waste receipts';
      })
      .addCase(addWasteReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWasteReceipt.fulfilled, (state, action: PayloadAction<WasteReceipt>) => {
        state.wasteReceipts.push(action.payload);
        state.loading = false;
      })
      .addCase(addWasteReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add waste receipt';
      })
      .addCase(updateWasteReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWasteReceipt.fulfilled, (state, action: PayloadAction<WasteReceipt>) => {
        const index = state.wasteReceipts.findIndex((wasteReceipt) => wasteReceipt.id === action.payload.id);
        if (index !== -1) {
          state.wasteReceipts[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWasteReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update waste receipt';
      })
      .addCase(deleteWasteReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWasteReceipt.fulfilled, (state, action: PayloadAction<number>) => {
        state.wasteReceipts = state.wasteReceipts.filter((wasteReceipt) => wasteReceipt.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWasteReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wasteReceiptSlice.reducer;

// Exporting async thunks for use in components
export { fetchWasteReceipts, fetchWasteReceipt, addWasteReceipt, updateWasteReceipt, deleteWasteReceipt };

// Selectors
export const selectWasteReceipts = (state: RootState) => state.wasteReceipt.wasteReceipts;
export const selectWasteReceiptLoading = (state: RootState) => state.wasteReceipt.loading;
export const selectWasteReceiptError = (state: RootState) => state.wasteReceipt.error;
