import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/auth`, {
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

export const updateUserSettings = createAsyncThunk(
  'user/updateUserSettings',
  async (userData, { rejectWithValue, fulfillWithValue }) => {
    const toastId = toast.loading('Updating settings...');
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.put(`${baseUrl}/api/user/settings`, userData, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      if (response?.status === 200 && response.data.success) {
        toast.update(toastId, {
          render: 'Settings updated successfully!',
          type: 'success',
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });
        return fulfillWithValue(response.data.settings);
      }

      throw new Error('Failed to update settings!');
    } catch (err) {
      toast.update(toastId, {
        render: 'Failed to update settings. Please try again.',
        type: 'error',
        isLoading: false,
        closeOnClick: true,
        autoClose: 5000,
      });
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteUserAccount',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    const toastId = toast.loading('Deleting account...');
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.delete(`${baseUrl}/api/user/delete`, {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      if (response?.status === 200 && response.data.success) {
        toast.update(toastId, {
          render: 'Account deleted successfully!',
          type: 'success',
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });
        return fulfillWithValue(response.data);
      }

      throw new Error('Failed to delete account!');
    } catch (err) {
      toast.update(toastId, {
        render: 'Failed to delete account. Please try again.',
        type: 'error',
        isLoading: false,
        closeOnClick: true,
        autoClose: 5000,
      });
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: true,
    hasError: false,
    isUpdating: false,
    updateError: false,
    isDeleting: false,
    deleteError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateUserSettings.pending, (state) => {
        state.isUpdating = true;
        state.updateError = false;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserSettings.rejected, (state) => {
        state.isUpdating = false;
        state.updateError = true;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.isDeleting = true;
        state.deleteError = false;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.user = {};
      })
      .addCase(deleteUserAccount.rejected, (state) => {
        state.isDeleting = false;
        state.deleteError = true;
      });
  },
});

export const selectIsLoggedIn = (state) => Boolean(state.user.user?._id);
export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserHasError = (state) => state.user.hasError;
export const selectUserUpdating = (state) => state.user.isUpdating;
export const selectUserUpdateError = (state) => state.user.updateError;
export const selectUserDeleting = (state) => state.user.isDeleting;
export const selectUserDeleteError = (state) => state.user.deleteError;

// export const { } = userSlice.actions;

export default userSlice.reducer;
