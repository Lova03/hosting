import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const fetchArticleToEdit = createAsyncThunk(
  'edit/fetchArticleToEdit',
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
      if (response?.status === 200) {
        return fulfillWithValue({ ...response.data });
      }

      throw new Error('Request to API failed!');
    } catch (err) {
      if (err.response?.status === 401) {
        return fulfillWithValue({});
      }
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

const editArticleSlice = createSlice({
  name: 'edit',
  initialState: {
    author: '',
    id: '',
    unlisted: false,
    blocks: [],
    title: '',
    description: '',
    thumbnail: '',
    tags: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    toggleUnlistedToEdit: (state, action) => {
      state.unlisted = action.payload === undefined ? !state.unlisted : action.payload;
    },
    addBlockToEdit: (state, action) => {
      const block = {
        id: uuidv4(),
        type: action.payload,
        content: '',
      };
      state.blocks.push(block);
    },
    moveBlockToEdit: (state, action) => {
      const { id, dir } = action.payload;
      if (!id || !dir) return;
      if (state.blocks.length === 1 || state.blocks.length === 0) return;
      if (dir !== 'up' && dir !== 'down') return;

      const existingBlockIndex = state.blocks.findIndex((b) => b.id === id);
      if (existingBlockIndex === -1) return;
      if (
        (existingBlockIndex === 0 && dir === 'up') ||
        (existingBlockIndex === state.blocks.length - 1 && dir === 'down')
      )
        return;

      const to = dir === 'up' ? existingBlockIndex - 1 : existingBlockIndex + 1;

      const f = state.blocks.splice(existingBlockIndex, 1)[0];

      state.blocks.splice(to, 0, f);
    },
    removeBlockToEdit: (state, action) => {
      const blockIdToRemove = action.payload;
      state.blocks = state.blocks.filter((block) => block.id !== blockIdToRemove);
    },
    setContentToEdit: (state, action) => {
      const blockIdToUpdate = action.payload.id;
      const blockIndexToUpdate = state.blocks.findIndex((block) => block.id === blockIdToUpdate);
      state.blocks[blockIndexToUpdate].content = action.payload.content;
    },
    setTitleToEdit: (state, action) => {
      state.title = action.payload;
    },
    setDescriptionToEdit: (state, action) => {
      state.description = action.payload;
    },
    setThumbnailToEdit: (state, action) => {
      state.thumbnail = action.payload;
    },
    addTagToEdit: (state, action) => {
      if (state.tags.includes(action.payload)) return;
      state.tags.push(action.payload);
    },
    removeTagToEdit: (state, action) => {
      const tagToRemove = action.payload;
      state.tags = state.tags.filter((tag) => tag !== tagToRemove);
    },
    setTagsToEdit: (state, action) => {
      state.tags = action.payload;
    },
    resetEditArticleToEdit: (state, action) => {
      state.author = '';
      state.id = '';
      state.title = '';
      state.description = '';
      state.thumbnail = '';
      state.unlisted = false;
      state.tags = [];
      state.blocks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleToEdit.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchArticleToEdit.fulfilled, (state, action) => {
        const {
          article: { unlisted, title, description, thumbnail, tags, blocks, author, id },
        } = action.payload;
        state.isLoading = false;

        state.author = author;
        state.id = id;
        state.unlisted = unlisted;
        state.title = title;
        state.description = description;
        state.thumbnail = thumbnail;
        state.tags = tags;
        state.blocks = blocks;
      })
      .addCase(fetchArticleToEdit.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectArticleToEditLoading = (state) => state.edit.isLoading;
export const selectArticleToEditHasError = (state) => state.edit.hasError;
export const selectUnlistedToEdit = (state) => state.edit.unlisted;
export const selectBlocksToEdit = (state) => state.edit.blocks;
export const selectTitleToEdit = (state) => state.edit.title;
export const selectDescriptionToEdit = (state) => state.edit.description;
export const selectThumbnailToEdit = (state) => state.edit.thumbnail;
export const selectTagsToEdit = (state) => state.edit.tags;
export const selectArticleToEditAuthor = (state) => state.edit.author;
export const selectArticleToEditId = (state) => state.edit.id;

export const {
  toggleUnlistedToEdit,
  addBlockToEdit,
  moveBlockToEdit,
  removeBlockToEdit,
  setContentToEdit,
  setTitleToEdit,
  setThumbnailToEdit,
  setDescriptionToEdit,
  addTagToEdit,
  removeTagToEdit,
  setTagsToEdit,
  resetEditArticleToEdit,
} = editArticleSlice.actions;

export default editArticleSlice.reducer;
