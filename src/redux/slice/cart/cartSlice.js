import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addBook from "./act/addBook";
import removeBook from "./act/removeBook";
import updateQuantity from "./act/updateQuantity";
import getCart from "./act/getCart";
import clearCart from "./act/clearCart";
import confirm from "./act/confirm";

import toast from "react-hot-toast";

// State
const initialState = {
  cart: {},
  isLoadingCart: "Idle",
  numberOfItmes: null,
  error: null,
};

// Slice
const cartSlice = createSlice({
  name: "Cart",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addBook.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = action.payload.data;
      state.numberOfItmes = action.payload.numberOfItmes;
    });

    builder.addCase(addBook.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(getCart.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = action.payload.data;
      state.numberOfItmes = action.payload.numberOfItmes;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload?.data;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(updateQuantity.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = action.payload.data;
      state.numberOfItmes = action.payload.numberOfItmes;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(removeBook.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(removeBook.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = action.payload.data;
      state.numberOfItmes = action.payload.numberOfItmes;
    });

    builder.addCase(removeBook.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(clearCart.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = action.payload.data;
      state.numberOfItmes = action.payload.numberOfItmes;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(confirm.pending, (state) => {
      state.isLoadingCart = "Pending";
      state.error = null;
    });
    builder.addCase(confirm.fulfilled, (state, action) => {
      state.isLoadingCart = "Success";
      state.error = null;
      state.cart = {};
    });
    builder.addCase(confirm.rejected, (state, action) => {
      state.isLoadingCart = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
  },
});

export default cartSlice.reducer;

export { addBook, clearCart, updateQuantity, getCart, removeBook,confirm };
