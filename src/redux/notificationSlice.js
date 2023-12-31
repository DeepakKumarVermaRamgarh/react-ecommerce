// Import createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { addIntoCart, removeFromCart } from './cartSlice';
import { addNewProduct } from './productSlice';

// Define constants for notification types
const TYPES = Object.freeze({
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
});

// Define the initial state for notifications
const INITIAL_STATE = {
  messageTitle: '',
  messageBody: '',
  type: TYPES.SUCCESS,
};

// Create the notificationSlice using Redux Toolkit's createSlice function
const notificatinSlice = createSlice({
  name: 'notification',
  initialState: INITIAL_STATE,
  reducers: {
    // Reducer for clearing the notification
    clearNotification: (state, action) => {
      // Reset the notification state to the initial values
      state.messageTitle = '';
      state.messageBody = '';
      state.type = TYPES.SUCCESS;
    },
  },
  // Extra reducers to handle actions dispatched from other slices
  extraReducers: builder => {
    builder
      .addCase(addIntoCart, (state, action) => {
        state.messageTitle = 'Cart';
        state.messageBody = 'Added into cart.';
      })
      .addCase(removeFromCart, (state, action) => {
        state.messageTitle = 'Cart';
        state.messageBody = 'Removed from cart';
      })
      .addCase(addNewProduct, (state, action) => {
        state.messageTitle = 'Product';
        state.messageBody = 'New product Added';
      })
      .addCase('products/updateProduct', (state, action) => {
        state.messageTitle = 'Product';
        state.messageBody = 'Product Updated';
      })
      .addCase('products/deleteProduct', (state, action) => {
        state.messageTitle = 'Product';
        state.messageBody = 'Product Removed';
      });
  },
});

// Export the selector function to get the notification state from the Redux store
export const notificationSelector = state => state.notification;
// Export the actions generated by createSlice
export const { clearNotification } = notificatinSlice.actions;
// Export the reducer generated by createSlice
export const notificationReducer = notificatinSlice.reducer;
