import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "./slice/user/bookSlice";
import categorySlice from "./slice/category/categorySlice"

export const store = configureStore({
  reducer: {
    bookSlice,
    categorySlice
  },
});
