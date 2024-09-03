import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("c") ? JSON.parse(localStorage.getItem("c")) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart(state, action) {
      const productExists = state.cart.find(
        (p) => p._id === action.payload._id
      );
      if (!productExists) {
        state.cart.push(action.payload);
        toast.success("product added to cart");
        localStorage.setItem("c", JSON.stringify(state.cart));
      } else {
        toast.error("item already added to cart");
      }
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((p) => p._id !== action.payload);
      localStorage.setItem("c", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("c");
    },
  },
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartActions, cartReducer };
