import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { selectAllProducts } from '../products/productsSlice';
import { selectUser } from '../user/userSlice';

export const loadAndValidateCart = createAsyncThunk(
  'cart/loadAndValidate',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const user = selectUser(state);
    if (!user || !user._id) return;

    const savedCart = localStorage.getItem(`cart_${user._id}`);
    if (!savedCart) return;

    const products = selectAllProducts(state);
    const cartItems = JSON.parse(savedCart).items;

    const validatedItems = cartItems.filter((cartItem) => {
      return (
        products.minecraft?.some(
          (p) => p._id === cartItem._id && p.pricePerMonth === cartItem.pricePerMonth
        ) ||
        products.discordBot?.some(
          (p) => p._id === cartItem._id && p.pricePerMonth === cartItem.pricePerMonth
        ) ||
        products.vps?.some((p) => p._id === cartItem._id && p.pricePerMonth === cartItem.pricePerMonth)
      );
    });

    validatedItems.forEach((item) => {
      dispatch(addToCart(item));
    });
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    discount: 0,
    promocode: '',
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const itemConfigKey =
        newItem._id + '-' + (newItem.serverType || newItem.botLanguage || newItem.os || 'default');

      const existingItem = state.items.find((item) => item.itemConfigKey === itemConfigKey);

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          itemConfigKey: itemConfigKey,
        });
      }

      state.totalPrice =
        Math.round((state.totalPrice + newItem.pricePerMonth * (newItem.quantity || 1)) * 100) / 100;
      state.totalQuantity += newItem.quantity || 1;
    },
    updateItemQuantity(state, action) {
      const { itemConfigKey, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.itemConfigKey === itemConfigKey);

      if (itemIndex !== -1 && quantity > 0) {
        state.items[itemIndex].quantity = quantity;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = state.items.reduce(
          (total, item) => total + item.pricePerMonth * item.quantity,
          0
        );
        state.totalPrice = Math.round(totalPrice * 100) / 100;
      }
    },
    changeItemKey(state, action) {
      const { itemConfigKey, newConfig } = action.payload;

      const existingItemIndex = state.items.findIndex((item) => item.itemConfigKey === itemConfigKey);
      if (existingItemIndex === -1) return; // If the item doesn't exist, exit

      const existingItem = state.items[existingItemIndex];
      const newConfigValue = newConfig.serverType || newConfig.botLanguage || newConfig.os || 'default';
      const newItemConfigKey = existingItem._id + '-' + newConfigValue;

      const targetItemIndex = state.items.findIndex((item) => item.itemConfigKey === newItemConfigKey);

      if (targetItemIndex !== -1 && targetItemIndex !== existingItemIndex) {
        // Construct a message detailing the merge
        const targetItem = state.items[targetItemIndex];
        const oldConfig =
          existingItem.serverType || existingItem.botLanguage || existingItem.os || 'default';
        const mergeMessage = `Merged ${existingItem.serviceType} - ${existingItem.planName} (${oldConfig}) into ${targetItem.serviceType} - ${targetItem.planName} (${newConfigValue}).`;

        // Update the quantity and configuration of the existing item
        existingItem.quantity += targetItem.quantity;
        existingItem.itemConfigKey = newItemConfigKey;
        if (newConfig.serverType) existingItem.serverType = newConfig.serverType;
        if (newConfig.botLanguage) existingItem.botLanguage = newConfig.botLanguage;
        if (newConfig.os) existingItem.os = newConfig.os;

        // Display the toast with the detailed merge message
        toast.success(mergeMessage);

        // Remove the target item from the array
        state.items.splice(targetItemIndex, 1);
      } else if (targetItemIndex === -1) {
        // If no item with the new configuration exists, simply update the existing item
        existingItem.itemConfigKey = newItemConfigKey;
        if (newConfig.serverType) existingItem.serverType = newConfig.serverType;
        if (newConfig.botLanguage) existingItem.botLanguage = newConfig.botLanguage;
        if (newConfig.os) existingItem.os = newConfig.os;
      }
      // No action needed if targetItemIndex and existingItemIndex are the same
    },
    removeFromCart(state, action) {
      const itemConfigKey = action.payload;
      const existingItem = state.items.find((item) => item.itemConfigKey === itemConfigKey);

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        state.totalPrice = Math.round((state.totalPrice - existingItem.pricePerMonth) * 100) / 100;
        state.items = state.items.filter((item) => item.itemConfigKey !== itemConfigKey);
      } else {
        state.totalPrice = Math.round((state.totalPrice - existingItem.pricePerMonth) * 100) / 100;
        existingItem.quantity--;
      }

      state.totalQuantity--;
    },
    removeAllFromCart(state, action) {
      const itemConfigKey = action.payload;
      const existingItem = state.items.find((item) => item.itemConfigKey === itemConfigKey);

      if (!existingItem) return;

      state.totalPrice =
        Math.round((state.totalPrice - existingItem.pricePerMonth * existingItem.quantity) * 100) / 100;
      state.totalQuantity -= existingItem.quantity;

      state.items = state.items.filter((item) => item.itemConfigKey !== itemConfigKey);
    },
    setDiscount(state, action) {
      const { discount, code } = action.payload;
      state.discount = discount;
      state.promocode = code;
      toast.success(`Discount of ${discount}% applied with promocode "${code.toUpperCase()}"!`);
    },
    removeDiscount(state) {
      toast.info(`Promocode "${state.promocode.toUpperCase()}" removed.`);
      state.discount = 0;
      state.promocode = '';
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  updateItemQuantity,
  changeItemKey,
  removeFromCart,
  removeAllFromCart,
  setDiscount,
  removeDiscount,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalPrice = (state) => {
  if (state.cart.discount > 0) {
    const discountAmount = state.cart.totalPrice * (state.cart.discount / 100);
    return Math.round((state.cart.totalPrice - discountAmount) * 100) / 100;
  }
  return state.cart.totalPrice;
};
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartPromocode = (state) => state.cart.promocode;
export const selectCartPromocodeApplied = (state) => state.cart.promocode?.trim()?.length > 0;

export default cartSlice.reducer;
