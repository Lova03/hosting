import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ query, page }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(
        `${baseUrl}/api/articles?${query ? `q=${query}&` : ''}l=${page}`,
        {
          withCredentials: true,
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        }
      );
      if (response.status === 200) {
        return fulfillWithValue({ ...response.data });
      }

      throw new Error('Request to API failed!');
    } catch (err) {
      if (err.response.status === 401) {
        return fulfillWithValue({});
      }
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    lastSearchedTerm: null,
    isLoading: true,
    hasError: false,
    moreToLoad: true,
  },
  reducers: {
    toggleMoreToLoad: (state, action) => {
      state.moreToLoad = action.payload !== undefined ? action.payload : !state.moreToLoad;
    },
    resetArticles: (state, action) => {
      state.articles = [];
    },
    resetLastSearchedTerm: (state, action) => {
      state.lastSearchedTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const { articles = [] } = action.payload;
        state.lastSearchedTerm = action.meta.arg.query;
        state.isLoading = false;
        if (articles.length === 0) {
          state.moreToLoad = false;
        } else {
          const savedArticles = state.articles || [];
          if (
            savedArticles.length > 0 &&
            savedArticles[savedArticles.length - 1].id === articles[articles.length - 1].id
          )
            state.moreToLoad = false;
          else state.articles = [...savedArticles, ...articles];
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectArticles = (state) => state.articles.articles;
export const selectMoreToLoad = (state) => state.articles.moreToLoad;
export const selectArticlesLoading = (state) => state.articles.isLoading;
export const selectArticlesHasError = (state) => state.articles.hasError;
export const selectLastSearchedTerm = (state) => state.articles.lastSearchedTerm;

export const { toggleMoreToLoad, resetArticles, resetLastSearchedTerm } = articlesSlice.actions;

export default articlesSlice.reducer;
