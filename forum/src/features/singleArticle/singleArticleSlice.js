import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticle = createAsyncThunk(
  'singleArticle/fetchArticle',
  async ({ articleId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/api/articles/${articleId}`, {
        withCredentials: true,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
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

export const fetchComments = createAsyncThunk(
  'singleArticle/fetchComments',
  async ({ articleId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/api/articles/${articleId}/comments`, {
        withCredentials: true,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
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

const singleArticleSlice = createSlice({
  name: 'singleArticle',
  initialState: {
    article: {},
    comments: [],
    isLoading: true,
    hasError: false,
    commentsLoading: false,
    commentsHasError: false,
  },
  reducers: {
    resetArticle: (state, action) => {
      state.article = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        const {
          article: { comments, ...article },
        } = action.payload;
        state.isLoading = false;
        state.article = article;
        state.comments = comments;
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsLoading = true;
        state.commentsHasError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { comments } = action.payload;
        state.commentsLoading = false;
        state.comments = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsLoading = false;
        state.commentsHasError = true;
      });
  },
});

export const selectArticle = (state) => state.singleArticle.article;
export const selectArticleLoading = (state) => state.singleArticle.isLoading;
export const selectArticleHasError = (state) => state.singleArticle.hasError;
export const selectComments = (state) => state.singleArticle.comments;
export const selectCommentsLoading = (state) => state.singleArticle.commentsLoading;
export const selectCommentsHasError = (state) => state.singleArticle.commentsHasError;

export const { resetArticle } = singleArticleSlice.actions;

export default singleArticleSlice.reducer;
