// Importing necessary modules
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import { notificationReducer } from './notificationSlice';
import storage from 'redux-persist/lib/storage';

// export const store = configureStore({
//   reducer: {
//     products: productReducer,
//     cart: cartReducer,
//     notification: notificationReducer,
//   },
// });

// Combining reducers into a single rootReducer
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  notification: notificationReducer,
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'ecom', // Key to use for the persisted state in storage
  storage, // Storage engine to use (redux-persist uses `localStorage` by default)
};

// Creating a persistedReducer using Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creating the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Creating a persistor to persist and rehydrate the state
export const persistor = persistStore(store);
