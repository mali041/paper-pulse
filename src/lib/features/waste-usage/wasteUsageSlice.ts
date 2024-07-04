import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface WasteUsage {
  id: number;
  stackNo: number;
  wasteTypeId: number;
  usedQuantity: number;
  usageDate: string;
}

interface WasteUsageState {
  wasteUsages: WasteUsage[];
  loading: boolean;
  error: string | null;
}

const initialState: WasteUsageState = {
  wasteUsages: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchWasteUsages = createAsyncThunk('wasteUsage/fetchWasteUsages', async () => {
  const response = await fetch('/api/waste-used');
  if (!response.ok) {
    throw new Error('Failed to fetch waste usages');
  }
  return await response.json();
});

const fetchWasteUsage = createAsyncThunk('wasteUsage/fetchWasteUsage', async (id: string) => {
  const response = await fetch(`/api/waste-used/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch waste usage');
  }
  return await response.json();
});

const addWasteUsage = createAsyncThunk('wasteUsage/addWasteUsage', async (wasteUsage: Omit<WasteUsage, 'id'>) => {
  console.log("Payment data to be sent:", wasteUsage);
  const response = await fetch('/api/waste-used', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteUsage),
  });
  if (!response.ok) {
    throw new Error('Failed to add waste usage');
  }
  return await response.json();
});

const updateWasteUsage = createAsyncThunk('wasteUsage/updateWasteUsage', async (wasteUsage: WasteUsage) => {
  const response = await fetch(`/api/waste-used/${wasteUsage.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteUsage),
  });
  if (!response.ok) {
    throw new Error('Failed to update waste usage');
  }
  return await response.json();
});

const deleteWasteUsage = createAsyncThunk('wasteUsage/deleteWasteUsage', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/waste-used/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete waste usage');
    }
    return id; // Return the deleted waste usage ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const wasteUsageSlice = createSlice({
  name: 'wasteUsage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWasteUsages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteUsages.fulfilled, (state, action: PayloadAction<WasteUsage[]>) => {
        state.wasteUsages = action.payload;
        state.loading = false;
      })
      .addCase(fetchWasteUsages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waste usages';
      })
      .addCase(addWasteUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWasteUsage.fulfilled, (state, action: PayloadAction<WasteUsage>) => {
        state.wasteUsages.push(action.payload);
        state.loading = false;
      })
      .addCase(addWasteUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add waste usage';
      })
      .addCase(updateWasteUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWasteUsage.fulfilled, (state, action: PayloadAction<WasteUsage>) => {
        const index = state.wasteUsages.findIndex((wasteUsage) => wasteUsage.id === action.payload.id);
        if (index !== -1) {
          state.wasteUsages[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWasteUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update waste usage';
      })
      .addCase(deleteWasteUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWasteUsage.fulfilled, (state, action: PayloadAction<number>) => {
        state.wasteUsages = state.wasteUsages.filter((wasteUsage) => wasteUsage.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWasteUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wasteUsageSlice.reducer;

// Exporting async thunks for use in components
export { fetchWasteUsages, fetchWasteUsage, addWasteUsage, updateWasteUsage, deleteWasteUsage };

// Selectors
export const selectWasteUsages = (state: RootState) => state.wasteUsage.wasteUsages;
export const selectWasteUsageLoading = (state: RootState) => state.wasteUsage.loading;
export const selectWasteUsageError = (state: RootState) => state.wasteUsage.error;
