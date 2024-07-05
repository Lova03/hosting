import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.get(`${baseUrl}/api/notifications`, {
        withCredentials: true,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      });
      if (response?.status === 200) {
        return fulfillWithValue(response.data.notifications);
      }

      throw new Error('Request to API failed!');
    } catch (err) {
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      const response = await axios.put(
        `${baseUrl}/api/notifications/${notificationId}/read`,
        {},
        {
          withCredentials: true,
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
        }
      );
      if (response?.status === 200) {
        return fulfillWithValue(notificationId);
      }

      throw new Error('Request to API failed!');
    } catch (err) {
      return rejectWithValue({ success: false, reason: err.message });
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    isLoading: true,
    hasError: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notificationId = action.payload;
        const notification = state.notifications.find((n) => n._id === notificationId);
        if (notification) {
          notification.read = true;
        }
      });
  },
});

// export const {  } = notificationSlice.actions;

export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationsLoading = (state) => state.notifications.isLoading;
export const selectNotificationsHasError = (state) => state.notifications.hasError;

export default notificationSlice.reducer;
