import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const createArticleSlice = createSlice({
  name: 'create',
  initialState: {
    unlisted: false,
    blocks: [],
    title: '',
    description: '',
    thumbnail: '',
    tags: [],
  },
  reducers: {
    toggleUnlisted: (state, action) => {
      state.unlisted = action.payload === undefined ? !state.unlisted : action.payload;
    },
    addBlock: (state, action) => {
      const block = {
        id: uuidv4(),
        type: action.payload,
        content: '',
      };
      state.blocks.push(block);
    },
    moveBlock: (state, action) => {
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
    removeBlock: (state, action) => {
      const blockIdToRemove = action.payload;
      state.blocks = state.blocks.filter((block) => block.id !== blockIdToRemove);
    },
    setContent: (state, action) => {
      const blockIdToUpdate = action.payload.id;
      const blockIndexToUpdate = state.blocks.findIndex((block) => block.id === blockIdToUpdate);
      state.blocks[blockIndexToUpdate].content = action.payload.content;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },
    addTag: (state, action) => {
      if (state.tags.includes(action.payload)) return;
      state.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      const tagToRemove = action.payload;
      state.tags = state.tags.filter((tag) => tag !== tagToRemove);
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    resetCreateArticle: (state, action) => {
      state.title = '';
      state.description = '';
      state.thumbnail = '';
      state.unlisted = false;
      state.tags = [];
      state.blocks = [];
    },
  },
});

export const selectUnlisted = (state) => state.create.unlisted;
export const selectBlocks = (state) => state.create.blocks;
export const selectTitle = (state) => state.create.title;
export const selectDescription = (state) => state.create.description;
export const selectThumbnail = (state) => state.create.thumbnail;
export const selectTags = (state) => state.create.tags;

export const {
  toggleUnlisted,
  addBlock,
  moveBlock,
  removeBlock,
  setContent,
  setTitle,
  setThumbnail,
  setDescription,
  addTag,
  removeTag,
  setTags,
  resetCreateArticle,
} = createArticleSlice.actions;

export default createArticleSlice.reducer;
