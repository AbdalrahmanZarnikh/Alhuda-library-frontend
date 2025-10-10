import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const getBooks = createAsyncThunk(
  "Book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        "/api/books?sort=createdAt"
      );




      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default getBooks;
