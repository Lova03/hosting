import { configureStore } from '@reduxjs/toolkit';
import controlsReducer from '../features/controls/controlsSlice';
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});
