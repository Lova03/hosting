import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/api/products`, {
        withCredentials: true,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      if (response?.status === 200) {
        return fulfillWithValue({ ...response.data });
      }

      throw new Error('Request to API failed!');
    } catch (err) {
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: {
      minecraft: [],
      discordBot: [],
      vps: [],
    },
    searchTerm: '',
    isLoading: true,
    hasError: null,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.minecraft = action.payload.products.filter(
          (p) => p.serviceType === 'Minecraft Hosting'
        );
        state.products.discordBot = action.payload.products.filter(
          (p) => p.serviceType === 'Discord Bot Hosting'
        );
        state.products.vps = action.payload.products.filter((p) => p.serviceType === 'VPS Hosting');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;

export const selectFilteredProducts = createSelector(
  [(state) => state.products.products, (state) => state.products.searchTerm],
  (products, searchTerm) => {
    const filterProducts = (productList) =>
      productList.filter((product) =>
        Object.values(product).some((value) => value.toString().toLowerCase().includes(searchTerm))
      );
    return {
      minecraft: filterProducts(products.minecraft),
      discordBot: filterProducts(products.discordBot),
      vps: filterProducts(products.vps),
    };
  }
);

export const selectAllProducts = (state) => ({
  minecraft: state.products.products.minecraft,
  discordBot: state.products.products.discordBot,
  vps: state.products.products.vps,
});
export const selectProductsSearchTerm = (state) => state.products.searchTerm;
export const selectProductsIsLoading = (state) => state.products.isLoading;
export const selectProductsHasError = (state) => state.products.hasError;

export default productsSlice.reducer;
