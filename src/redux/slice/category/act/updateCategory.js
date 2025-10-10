import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const updateCategory = createAsyncThunk(
  "categories/update",
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/api/categories/${info.id}`, info.data);

      toast.success("تمت العملية بنجاح");

      return res.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default updateCategory;
