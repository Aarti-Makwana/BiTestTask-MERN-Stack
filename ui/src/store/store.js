// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import messageSlice from './messageSlice';
import chatSlice from './chatSlice';

const store = configureStore({
  reducer: {
    auth: userSlice,
    messageSlice: messageSlice,
    chatSlice: chatSlice
    // Add other reducers here if needed
  },
});

export default store;
