import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { categoryReducer } from "./slices/categorySlice";
import { promoCodeReducer } from "./slices/promocodeSlice";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    promocode: promoCodeReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
