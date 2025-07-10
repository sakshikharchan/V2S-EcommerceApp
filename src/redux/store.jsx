
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

export default store; // ✅ This is the fix
