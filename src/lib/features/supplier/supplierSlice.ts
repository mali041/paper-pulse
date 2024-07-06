import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Supplier {
  id: number;
  name: string;
  phoneNo: string;
}

interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

// Async thunks using createAsyncThunk
const fetchSuppliers = createAsyncThunk('supplier/fetchSuppliers', async () => {
  const response = await fetch('/api/suppliers');
  if (!response.ok) {
    throw new Error('Failed to fetch suppliers');
  }
  return await response.json();
});

const fetchSupplier = createAsyncThunk('supplier/fetchSupplier', async (id: string) => {
  const response = await fetch(`/api/suppliers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch supplier');
  }
  return await response.json();
});

const addSupplier = createAsyncThunk('supplier/addSupplier', async (supplier: Omit<Supplier, 'id'>) => {
  const response = await fetch('/api/suppliers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplier),
  });
  if (!response.ok) {
    throw new Error('Failed to add supplier');
  }
  return await response.json();
});

const updateSupplier = createAsyncThunk('supplier/updateSupplier', async (supplier: Supplier) => {
  const response = await fetch(`/api/suppliers/${supplier.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supplier),
  });
  if (!response.ok) {
    throw new Error('Failed to update supplier');
  }
  return await response.json();
});

const deleteSupplier = createAsyncThunk('supplier/deleteSupplier', async (id: number, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/suppliers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }
    return id; // Return the deleted supplier ID if successful
  } catch (error: any) {
    return rejectWithValue(error.message as Error); // Return error message on failure
  }
});

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action: PayloadAction<Supplier[]>) => {
        state.suppliers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch suppliers';
      })
      .addCase(addSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action: PayloadAction<Supplier>) => {
        state.suppliers.push(action.payload);
        state.loading = false;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add supplier';
      })
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action: PayloadAction<Supplier>) => {
        const index = state.suppliers.findIndex((supplier) => supplier.id === action.payload.id);
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update supplier';
      })
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action: PayloadAction<number>) => {
        state.suppliers = state.suppliers.filter((supplier) => supplier.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default supplierSlice.reducer;

// Exporting async thunks for use in components
export { fetchSuppliers, fetchSupplier, addSupplier, updateSupplier, deleteSupplier };

// Selectors
export const selectSuppliers = (state: RootState) => state.supplier.suppliers;
export const selectSupplierLoading = (state: RootState) => state.supplier.loading;
export const selectSupplierError = (state: RootState) => state.supplier.error;
