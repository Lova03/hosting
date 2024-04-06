import { createSlice } from '@reduxjs/toolkit';

const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    navbar: {
      opened: false,
    },
    searchbar: {
      opened: false,
      typing: false,
      searchTerm: '',
      page: 1,
    },
    signIn: {
      opened: true,
    },
    deposit: {
      amount: 5,
      method: 'paypal',
    },
  },
  reducers: {
    toggleNavbar: (state, action) => {
      state.navbar.opened = action.payload === undefined ? !state.navbar.opened : action.payload;
    },
    toggleSignInModal: (state, action) => {
      state.signIn.opened = action.payload === undefined ? !state.signIn.opened : action.payload;
    },
    changeSearchTerm: (state, action) => {
      state.searchbar.searchTerm = action.payload;
    },
    resetSearchTerm: (state, _) => {
      state.searchbar.searchTerm = '';
    },
    toggleSearchbar: (state, action) => {
      state.searchbar.opened = action.payload === undefined ? !state.searchbar.opened : action.payload;
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
    setDepositAmount: (state, action) => {
      state.deposit.amount = action.payload;
    },
    setDepositMethod: (state, action) => {
      state.deposit.method = action.payload;
    },
  },
});

export const selectNavbarOpened = (state) => state.controls.navbar.opened;
export const selectSignInOpened = (state) => state.controls.signIn.opened;
export const selectSearchTerm = (state) => state.controls.searchbar.searchTerm;
export const selectSearchBarOpened = (state) => state.controls.searchbar.opened;
export const selectSearchPage = (state) => state.controls.searchbar.page;
export const selectSearchBarTyping = (state) => state.controls.searchbar.typing;
export const selectDepositAmount = (state) => state.controls.deposit.amount;
export const selectDepositMethod = (state) => state.controls.deposit.method;

export const {
  toggleNavbar,
  toggleSignInModal,
  changeSearchTerm,
  resetSearchTerm,
  toggleSearchbar,
  toggleSearchbarTyping,
  setSearchPage,
  incrementSearchPage,
  setDepositAmount,
  setDepositMethod,
} = controlsSlice.actions;

export default controlsSlice.reducer;
