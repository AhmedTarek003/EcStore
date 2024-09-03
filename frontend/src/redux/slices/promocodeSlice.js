import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promoCodes: [],
  promo_code: null,
};

const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    getAllPromoCodes(state, action) {
      state.promoCodes = action.payload;
    },
    getPromoCode(state, action) {
      state.promo_code = action.payload;
    },
    removePromoCode(state) {
      state.promo_code = null;
    },
    deletePromoCode(state, action) {
      state.promoCodes = state.promoCodes.filter(
        (p) => p._id !== action.payload
      );
    },
  },
});

const promoCodeActions = promoCodeSlice.actions;
const promoCodeReducer = promoCodeSlice.reducer;

export { promoCodeActions, promoCodeReducer };
