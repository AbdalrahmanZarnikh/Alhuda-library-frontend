import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./slice/user/bookSlice";
import categorySlice from "./slice/category/categorySlice"
import cartSlice from "./slice/cart/cartSlice"

export const store = configureStore({
  reducer: {
    bookSlice,
    categorySlice,
    cartSlice
  },
});
