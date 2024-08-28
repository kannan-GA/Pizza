import { createSlice } from '@reduxjs/toolkit';

const initialCartSlice = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartSlice,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteToCart(state, action) {
      console.log(state, action);
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;

      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0)
        cartSlice.caseReducers.deleteToCart(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  deleteToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
