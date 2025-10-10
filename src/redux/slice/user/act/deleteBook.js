import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const deleteBook = createAsyncThunk(
  "Book/deleteBook",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/api/books/${id}`);

      return id;
    } catch (error) {
      toast.error(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default deleteBook;
