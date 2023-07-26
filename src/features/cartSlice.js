import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.quantity++;
      console.log("State: ", state.cartItems + " Action: ", action);
    },
    removeFromCart: (state, action) => {
      const prodId = action.payload.id;
      const removeItem = state.cartItems.filter((item) => {
        return item.id !== prodId;
      });
      state.cartItems = removeItem;
      state.quantity--;
      console.log("Modified Cart: ", removeItem);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
