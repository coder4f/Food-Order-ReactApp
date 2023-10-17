import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  showCart: false,
  changed: false,
};

// With redux toolkit we can update state in MUTABLE way but I am not doing it here.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };

        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        showCart: state.showCart,
        changed: true,
      };
    },
    removeItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        showCart: state.showCart,
        changed: true,
      };
    },
    clearCart() {
      return initialState;
    },
    showCart(state) {
      return {
        items: state.items,
        totalAmount: state.totalAmount,
        showCart: true,
        changed: false,
      };
    },
    hideCart(state) {
      return {
        items: state.items,
        totalAmount: state.totalAmount,
        showCart: false,
        changed: false,
      };
    },
    updateCart(state, action) {
      return {
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        showCart: state.showCart,
        changed: false,
      };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
