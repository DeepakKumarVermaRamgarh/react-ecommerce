import { createSlice } from '@reduxjs/toolkit';

// Create the cartSlice using Redux Toolkit's createSlice function
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    // Reducer for adding a product into the cart
    addIntoCart: (state, action) => {
      state.push(action.payload);
    },
    // Reducer for removing a product from the cart
    removeFromCart: (state, action) => {
      // Use filter to create a new array with the product id removed
      return state.filter(productId => productId !== action.payload);
    },
  },
});

// Export the actions generated by createSlice
export const { addIntoCart, removeFromCart } = cartSlice.actions;
// Export a selector function to get the cart state from the Redux store
export const cartSelector = state => state.cart;
// Export the reducer generated by createSlice
export default cartSlice.reducer;