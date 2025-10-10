import { createSlice } from "@reduxjs/toolkit";

// Thunks
import addCategory from "./act/addCategory";
import deleteCategory from "./act/deleteCategory"
import getCategories from "./act/getCategories";
import updateCategory from "./act/updateCategory";

import toast from "react-hot-toast";

// State
const initialState = {
  categories: [],
  isLoading: "Idle",
  error: null,
};

// Slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = [...state.categories, action.payload];
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = state.categories.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.categories = state.categories.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default categorySlice.reducer;

export { addCategory, getCategories, deleteCategory,updateCategory };
