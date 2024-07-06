import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface WasteReceived {
  id: number;
  receiptDate: string;
  supplierId: number;
  vehicleNo: string;
  receiptId: number;
  wasteTypeId: number;
  unitPrice: number;
  netWeightOfWaste: number;
  totalAmountOfWaste: number;
  paymentReceived: number;
  balance: number;
}

interface WasteReceivedState {
  wasteReceiveds: WasteReceived[];
  loading: boolean;
  error: string | null;
}

const initialState: WasteReceivedState = {
  wasteReceiveds: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchWasteReceived = createAsyncThunk('wasteReceived/fetchWasteReceiveds', async () => {
  const response = await fetch('/api/waste-received');
  if (!response.ok) {
    throw new Error('Failed to fetch waste receiveds');
  }
  return await response.json();
});

const fetchWasteReceive = createAsyncThunk('wasteReceived/fetchWasteReceived', async (id: string) => {
  const response = await fetch(`/api/waste-received/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch waste received');
  }
  return await response.json();
});

const addWasteReceived = createAsyncThunk('wasteReceived/addWasteReceived', async (wasteReceived: Omit<WasteReceived, 'id'>) => {
  console.log("wasteReceived data to be sent:", wasteReceived);
  const response = await fetch('/api/waste-received', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteReceived),
  });
  if (!response.ok) {
    throw new Error('Failed to add waste received');
  }
  return await response.json();
});

const updateWasteReceived = createAsyncThunk('wasteReceived/updateWasteReceived', async (wasteReceived: WasteReceived) => {
  const response = await fetch(`/api/waste-received/${wasteReceived.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteReceived),
  });
  if (!response.ok) {
    throw new Error('Failed to update waste received');
  }
  return await response.json();
});

const deleteWasteReceived = createAsyncThunk('wasteReceived/deleteWasteReceived', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/waste-received/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete waste received');
    }
    return id; // Return the deleted waste received ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const wasteReceivedSlice = createSlice({
  name: 'wasteReceived',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWasteReceived.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteReceived.fulfilled, (state, action: PayloadAction<WasteReceived[]>) => {
        state.wasteReceiveds = action.payload;
        state.loading = false;
      })
      .addCase(fetchWasteReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waste received';
      })
      .addCase(addWasteReceived.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWasteReceived.fulfilled, (state, action: PayloadAction<WasteReceived>) => {
        state.wasteReceiveds.push(action.payload);
        state.loading = false;
      })
      .addCase(addWasteReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add waste received';
      })
      .addCase(updateWasteReceived.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWasteReceived.fulfilled, (state, action: PayloadAction<WasteReceived>) => {
        const index = state.wasteReceiveds.findIndex((wasteReceived) => wasteReceived.id === action.payload.id);
        if (index !== -1) {
          state.wasteReceiveds[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWasteReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update waste received';
      })
      .addCase(deleteWasteReceived.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWasteReceived.fulfilled, (state, action: PayloadAction<number>) => {
        state.wasteReceiveds = state.wasteReceiveds.filter((wasteReceived) => wasteReceived.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWasteReceived.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wasteReceivedSlice.reducer;

// Exporting async thunks for use in components
export { fetchWasteReceived, fetchWasteReceive, addWasteReceived, updateWasteReceived, deleteWasteReceived };

// Selectors
export const selectWasteReceived = (state: RootState) => state.wasteReceived.wasteReceiveds;
export const selectWasteReceivedLoading = (state: RootState) => state.wasteReceived.loading;
export const selectWasteReceivedError = (state: RootState) => state.wasteReceived.error;
