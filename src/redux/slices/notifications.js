import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lastNotification: null,
  notifications: [],
  unreadCount: 0
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLastNotification(state, action) {
      state.lastNotification = action.payload;
      state.notifications = [action.payload, ...state.notifications].slice(0, 50); // Keep last 50 notifications
      state.unreadCount += 1;
    },
    clearUnreadCount(state) {
      state.unreadCount = 0;
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
      state.lastNotification = null;
    }
  }
});

export const { setLastNotification, clearUnreadCount, clearNotifications } = slice.actions;
export default slice.reducer; 