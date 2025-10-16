import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const getBooks = createAsyncThunk("Book/getBooks", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    if (data?.category && data?.category !== "الكل") {
      const res = await axios.get(
        `/api/books?page=${data?.page}&limit=8&category=${data?.category}`
      );
      return res.data;
    }
    const res = await axios.get(`/api/books?page=${data?.page}&limit=8`);
    console.log(res.data)
    return res.data;
    
  } catch (error) {
    toast.error(error.response.data.message);
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export default getBooks;

// /api/books?page=1&limit=8&category=68ee43fc33965022b4435be2
