import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  purshases: [],
  sales: [],
  salesPerDay: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getAllOrders(state, action) {
      state.orders = action.payload;
    },
    getAllPurshases(state, action) {
      const orderExists = state.purshases.find(
        (p) => p._id === action.payload._id
      );
      if (!orderExists) {
        state.purshases.push(action.payload);
      }
    },
    getAllSales(state, action) {
      state.sales = action.payload;
    },
    getSalesPerDay(state, action) {
      state.salesPerDay = action.payload;
    },
  },
});

const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;

export { orderActions, orderReducer };
