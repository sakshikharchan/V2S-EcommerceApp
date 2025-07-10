

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ JSON Server is running on http://localhost:5000

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { getState }) => {
  const { filters, sortOption } = getState().products;
  const params = new URLSearchParams();

  // Filters (convert arrays to query string with multiple params)
  if (filters.size?.length) {
    filters.size.forEach(size => params.append('sizes_like', size));
  }

  if (filters.color?.length) {
    filters.color.forEach(color => params.append('color_like', color));
  }

  if (filters.brand?.length) {
    filters.brand.forEach(brand => params.append('brand_like', brand));
  }

  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    params.append('price_gte', filters.minPrice);
    params.append('price_lte', filters.maxPrice);
  }

  // Sorting
  if (sortOption) {
    params.append('_sort', sortOption.field);
    params.append('_order', sortOption.order);
  }

  const response = await axios.get(`http://localhost:5000/products?${params.toString()}`);
  return response.data;
});

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Product not found');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    product: null,
    filters: {
      size: [],
      color: [],
      brand: [],
      minPrice: 0,
      maxPrice: 100000
    },
    sortOption: null,
    loading: false,
    error: null
  },
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;

      // For range filters
      if (filterType === 'minPrice' || filterType === 'maxPrice') {
        state.filters[filterType] = value;
        return;
      }

      // For checkbox filters: toggle value in array
      const currentValues = state.filters[filterType] || [];
      const valueIndex = currentValues.indexOf(value);

      if (valueIndex === -1) {
        currentValues.push(value); // add if not present
      } else {
        currentValues.splice(valueIndex, 1); // remove if present
      }

      state.filters[filterType] = [...currentValues];
    },

    clearFilters: (state) => {
      state.filters = {
        size: [],
        color: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100000
      };
    },

    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilter, clearFilters, setSortOption } = productSlice.actions;
export default productSlice.reducer;
