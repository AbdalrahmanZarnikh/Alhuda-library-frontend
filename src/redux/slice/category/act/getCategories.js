import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";

const getCategories
 = createAsyncThunk(
    "categories/getAll",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.get(
          "/api/categories"
        );

           return res.data.data;
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data.message);
        }
      }
    }
  );

  

  export default getCategories
