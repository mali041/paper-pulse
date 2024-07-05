import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface WasteStack {
  id: number;
  stackNo: number;
  wasteTypeId: number;
  totalQuantity: number;
}

interface WasteStackState {
  wasteStacks: WasteStack[];
  loading: boolean;
  error: string | null;
}

const initialState: WasteStackState = {
  wasteStacks: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchWasteStacks = createAsyncThunk('wasteStack/fetchWasteStacks', async () => {
  const response = await fetch('/api/waste-stacks');
  if (!response.ok) {
    throw new Error('Failed to fetch waste stacks');
  }
  return await response.json();
});

const fetchWasteStack = createAsyncThunk('wasteStack/fetchWasteStack', async (id: string) => {
  const response = await fetch(`/api/waste-stacks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch waste stack');
  }
  return await response.json();
});

const addWasteStack = createAsyncThunk('wasteStack/addWasteStack', async (wasteStack: Omit<WasteStack, 'id'>) => {
  console.log("WasteStack data to be sent:", wasteStack);
  const response = await fetch('/api/waste-stacks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteStack),
  });
  if (!response.ok) {
    throw new Error('Failed to add waste stack');
  }
  return await response.json();
});

const updateWasteStack = createAsyncThunk('wasteStack/updateWasteStack', async (wasteStack: WasteStack) => {
  const response = await fetch(`/api/waste-stacks/${wasteStack.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wasteStack),
  });
  if (!response.ok) {
    throw new Error('Failed to update waste stack');
  }
  return await response.json();
});

const deleteWasteStack = createAsyncThunk('wasteStack/deleteWasteStack', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/waste-stacks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete waste stack');
    }
    return id; // Return the deleted waste stack ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const wasteStackSlice = createSlice({
  name: 'wasteStack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWasteStacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWasteStacks.fulfilled, (state, action: PayloadAction<WasteStack[]>) => {
        state.wasteStacks = action.payload;
        state.loading = false;
      })
      .addCase(fetchWasteStacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch waste stacks';
      })
      .addCase(addWasteStack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWasteStack.fulfilled, (state, action: PayloadAction<WasteStack>) => {
        state.wasteStacks.push(action.payload);
        state.loading = false;
      })
      .addCase(addWasteStack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add waste stack';
      })
      .addCase(updateWasteStack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWasteStack.fulfilled, (state, action: PayloadAction<WasteStack>) => {
        const index = state.wasteStacks.findIndex((wasteStack) => wasteStack.id === action.payload.id);
        if (index !== -1) {
          state.wasteStacks[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateWasteStack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update waste stack';
      })
      .addCase(deleteWasteStack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWasteStack.fulfilled, (state, action: PayloadAction<number>) => {
        state.wasteStacks = state.wasteStacks.filter((wasteStack) => wasteStack.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWasteStack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default wasteStackSlice.reducer;

// Exporting async thunks for use in components
export { fetchWasteStacks, fetchWasteStack, addWasteStack, updateWasteStack, deleteWasteStack };

// Selectors
export const selectWasteStacks = (state: RootState) => state.wasteStack.wasteStacks;
export const selectWasteStackLoading = (state: RootState) => state.wasteStack.loading;
export const selectWasteStackError = (state: RootState) => state.wasteStack.error;
