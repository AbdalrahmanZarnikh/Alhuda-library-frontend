import { createSlice } from "@reduxjs/toolkit";

// Thunks

import createBook from "./act/createBook";
import getBooks from "./act/getBooks";
import deleteBook from "./act/deleteBook";
import updateBook from "./act/updateBook";
import getBookBySearch from "./act/getBookBySearch";

import toast from "react-hot-toast";

// State
const initialState = {
  books: [],
  trim:"",
  isLoading: "Idle",
  paginationBooks:null,
  error: null,
};

// Slice
const bookSlice = createSlice({
  name: "Book",
  reducers: {
    setTrim:(state,action)=>{
       state.trim=action.payload
    }
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createBook.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.books = [...state.books, action.payload];
    });

    builder.addCase(createBook.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      // toast.error(state.error || "Network Error");
    });
    builder.addCase(getBooks.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.books = action.payload.data;
      state.paginationBooks=action.payload.pagination
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload?.data;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(getBookBySearch.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(getBookBySearch.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.books = action.payload;
    });
    builder.addCase(getBookBySearch.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(updateBook.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.books = state.books.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });

    builder.addCase(updateBook.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = "Pending";
      state.error = null;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = "Success";
      state.error = null;
      state.books = state.books.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.isLoading = "Fail";
      state.error = action.payload;
      toast.error(state.error || "Network Error");
    });
  },
});

export default bookSlice.reducer;
export const {setTrim} =bookSlice.actions

export { createBook, deleteBook, updateBook, getBooks,getBookBySearch };
