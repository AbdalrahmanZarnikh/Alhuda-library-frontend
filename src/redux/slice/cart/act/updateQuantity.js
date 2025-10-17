import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";
import toast from "react-hot-toast";

const updateQuantity = createAsyncThunk(
  "Cart/updateQuantity",
  async (info, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `/api/cart/${info.itemId}`,
        info.data
      );

      toast.success("تم تغيير الكمية بنجاح");

      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default updateQuantity;
