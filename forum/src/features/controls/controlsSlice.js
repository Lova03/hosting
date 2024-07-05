import { createSlice } from '@reduxjs/toolkit';

const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    searchbar: {
      typing: false,
      searchTerm: '',
      searchInputValue: '',
      page: 1,
    },
    signIn: {
      opened: true,
    },
  },
  reducers: {
    toggleSignInModal: (state, action) => {
      state.signIn.opened = action.payload === undefined ? !state.signIn.opened : action.payload;
    },
    changeSearchTerm: (state, action) => {
      state.searchbar.searchTerm = action.payload;
    },
    changeSearchInputValue: (state, action) => {
      state.searchbar.searchInputValue = action.payload;
    },
    resetSearchTerm: (state, _) => {
      state.searchbar.searchTerm = '';
      state.searchbar.searchInputValue = '';
    },
    toggleSearchbarTyping: (state, action) => {
      state.searchbar.typing = action.payload === undefined ? !state.searchbar.typing : action.payload;
    },
    setSearchPage: (state, action) => {
      state.searchbar.page = action.payload;
    },
    incrementSearchPage: (state, action) => {
      state.searchbar.page = state.searchbar.page + 1;
    },
  },
});

export const selectSignInOpened = (state) => state.controls.signIn.opened;
export const selectSearchTerm = (state) => state.controls.searchbar.searchTerm;
export const selectSearchInputValue = (state) => state.controls.searchbar.searchInputValue;
export const selectSearchPage = (state) => state.controls.searchbar.page;
export const selectSearchBarTyping = (state) => state.controls.searchbar.typing;

export const {
  toggleSignInModal,
  changeSearchTerm,
  changeSearchInputValue,
  resetSearchTerm,
  toggleSearchbarTyping,
  setSearchPage,
  incrementSearchPage,
} = controlsSlice.actions;

export default controlsSlice.reducer;
