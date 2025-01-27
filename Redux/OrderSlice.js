import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "./shareApi";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_all_orders_data: null,
  Get_all_orders_isError: false,
  Get_all_orders_isSuccess: false,
  Get_all_orders_isLoading: false,
  Get_all_orders_message: null,
};

export const Get_all_orders = createAsyncThunk(
  "OrderSlice/Get_all_orders",
  async (body, thunkAPI) => {
    try {
      const token = thunkAPI.getState()?.Auth?.user_data?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // If you need to use GET but also send a body
      const response = await axios.request({
        method: "GET",
        url: `${API_BASEURL}v1/customer/orders?status=pending&payment_status=pending &per_page=`,
        headers: config.headers,
        data: body, // Include body here
      });

    //   console.log({allOrders: response.data.data})
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching orders:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_orders.pending, (state) => {
        state.Get_all_orders_isLoading = true;
      })
      .addCase(Get_all_orders.fulfilled, (state, action) => {
        state.Get_all_orders_isLoading = false;
        state.Get_all_orders_isError = false;
        state.Get_all_orders_data = action.payload;
        state.Get_all_orders_message = null;
        state.Get_all_orders_isSuccess = true;
      })
      .addCase(Get_all_orders.rejected, (state, action) => {
        state.Get_all_orders_isLoading = false;
        state.Get_all_orders_isError = true;
        state.Get_all_orders_message = action.payload;
        state.Get_all_orders_data = null;
        state.Get_all_orders_isSuccess = false;
      });
  },
});

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
