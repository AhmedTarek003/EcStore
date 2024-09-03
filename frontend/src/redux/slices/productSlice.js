import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  favProducts: [],
  searchProducts: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts(state, action) {
      state.products = action.payload;
    },
    getSearchProducts(state, action) {
      state.searchProducts = action.payload;
    },
    getproduct(state, action) {
      state.product = action.payload;
    },
    getFavProducts(state, action) {
      const productExists = state.favProducts.find(
        (p) => p._id === action.payload._id
      );
      if (!productExists) {
        state.favProducts.push(action.payload);
      }
    },
    deleteproduct(state, action) {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
});

const productActions = productSlice.actions;
const productReducer = productSlice.reducer;

export { productActions, productReducer };
