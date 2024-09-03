import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getAllCategories(state, action) {
      state.categories = action.payload;
    },
    getCategory(state, action) {
      state.category = action.payload;
    },
    deletecategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const categoryActions = categorySlice.actions;
const categoryReducer = categorySlice.reducer;

export { categoryActions, categoryReducer };
