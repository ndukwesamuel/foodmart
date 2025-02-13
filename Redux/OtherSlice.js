import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "./shareApi";

import axios from "axios";
import { OrderSlice } from "./OrderSlice";

const API_BASEURL = "https://foodmart-backend.gigtech.site/api/";

const initialState = {
  faq_data: null,
  faq_isError: false,
  faq_isSuccess: false,
  faq_isLoading: false,
  faq_message: false,
};

export const Get_all_faqs = createAsyncThunk(
  "auth/Get_all_faqs",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      // ?.data?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_BASEURL}v1/faqs`, config);
      // console.log({ notification: response.data.data });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const OtherSlice = createSlice({
  name: "OtherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_faqs.pending, (state) => {
        state.faq_isLoading = true;
      })
      .addCase(Get_all_faqs.fulfilled, (state, action) => {
        state.faq_isLoading = false;
        state.faq_isSuccess = true;
        state.faq_isError = false;
        state.faq_message = null;
        state.faq_data = action.payload;
      })
      .addCase(Get_all_faqs.rejected, (state, action) => {
        state.faq_isLoading = false;
        state.faq_isError = true;
        state.faq_message = action.payload;
        state.faq_data = null;
        state.faq_isSuccess = false;
      });
  },
});

export const {} = OrderSlice.actions;

export default OrderSlice.reducer;
