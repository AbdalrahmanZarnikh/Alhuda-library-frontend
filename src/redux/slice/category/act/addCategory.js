import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";

const addCategory = createAsyncThunk("categories/add", async (data, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.post(`/api/categories`, data);

    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export default addCategory;
