import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    loading() {
      return {
        status: 'loading',
        title: 'Loading...',
      };
    },
    success(state, action) {
      return {
        status: 'success',
        title: 'Success!',
        message: action.payload.message,
      };
    },
    error(state, action) {
      return {
        status: 'error',
        title: 'Error!',
        message: action.payload.message,
      };
    },
    clear() {
      return null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
