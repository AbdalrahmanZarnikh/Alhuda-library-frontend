import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../api/configAxios";

const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await axios.delete(
          `/api/categories/${id}`
        );
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data.message);
        }
      }
    }
  );

  

  export default deleteCategory