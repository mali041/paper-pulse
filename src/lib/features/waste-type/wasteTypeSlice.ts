import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface WasteType {
  id: number;
  name: string;
}

interface WasteTypeState {
  wasteTypes: WasteType[];
  loading: boolean;
  error: string | null;
}

const initialState: WasteTypeState = {
  wasteTypes: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchWasteTypes = createAsyncThunk('wasteType/fetchWasteTypes', async () => {
  const response = await fetch('/api/waste-types');
  if (!response.ok) {
    throw new Error('Failed to fetch waste types');
  }
  return await response.json();
});

const fetchWasteType = createAsyncThunk('wasteType/fetchWasteType', async (id: string) => {
  const response = await fetch(`/api/waste-types/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch waste type');
  }
  return await response.json();
});

const addWasteType = createAsyncThunk('wasteType/addWasteType', async (wasteType: Omit<WasteType, 'id'>) => {
  console.log("wasteType data to be sent:", wasteType);
  const response = await fetch('/api/waste-types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteType),
  });
  if (!response.ok) {
    throw new Error('Failed to add waste type');
  }
  return await response.json();
});

const updateWasteType = createAsyncThunk('wasteType/updateWasteType', async (wasteType: WasteType) => {
  const response = await fetch(`/api/waste-types/${wasteType.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteType),
  });
  if (!response.ok) {
    throw new Error('Failed to update waste type');
  }
  return await response.json();
});

const deleteWasteType = createAsyncThunk('wasteType/deleteWasteType', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/waste-types/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete waste type');
    }
    return id; // Return the deleted waste type ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const wasteTypeSlice = createSlice({
  name: 'wasteType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWasteTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteTypes.fulfilled, (state, action: PayloadAction<WasteType[]>) => {
        state.wasteTypes = action.payload;
        state.loading = false;
      })
      .addCase(fetchWasteTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waste types';
      })
      .addCase(addWasteType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWasteType.fulfilled, (state, action: PayloadAction<WasteType>) => {
        state.wasteTypes.push(action.payload);
        state.loading = false;
      })
      .addCase(addWasteType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add waste type';
      })
      .addCase(updateWasteType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWasteType.fulfilled, (state, action: PayloadAction<WasteType>) => {
        const index = state.wasteTypes.findIndex((wasteType) => wasteType.id === action.payload.id);
        if (index !== -1) {
          state.wasteTypes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWasteType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update waste type';
      })
      .addCase(deleteWasteType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWasteType.fulfilled, (state, action: PayloadAction<number>) => {
        state.wasteTypes = state.wasteTypes.filter((wasteType) => wasteType.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWasteType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wasteTypeSlice.reducer;

// Exporting async thunks for use in components
export { fetchWasteTypes, fetchWasteType, addWasteType, updateWasteType, deleteWasteType };

// Selectors
export const selectWasteTypes = (state: RootState) => state.wasteType.wasteTypes;
export const selectWasteTypeLoading = (state: RootState) => state.wasteType.loading;
export const selectWasteTypeError = (state: RootState) => state.wasteType.error;
