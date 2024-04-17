import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import controlsReducer from '../features/controls/controlsSlice';
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import {
  addToCart,
  updateItemQuantity,
  changeItemKey,
  removeFromCart,
  removeAllFromCart,
  clearCart,
} from '../features/cart/cartSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

listenerMiddleware.startListening({
  predicate: isAnyOf(
    addToCart,
    updateItemQuantity,
    changeItemKey,
    removeFromCart,
    removeAllFromCart,
    clearCart
  ),
  effect: async (action, listenerApi) => {
    const currentState = listenerApi.getState();
    localStorage.setItem('cart', JSON.stringify(currentState.cart));
  },
});
