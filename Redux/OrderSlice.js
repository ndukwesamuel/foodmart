import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "./shareApi";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";
const API_BASEURL = "https://foodmart-backend.gigtech.site/api/";

const initialState = {
  Get_all_orders_data: null,
  Get_all_orders_isError: false,
  Get_all_orders_isSuccess: false,
  Get_all_orders_isLoading: false,
  Get_all_orders_message: null,

  Get_an_order_data: null,
  Get_an_order_isError: false,
  Get_an_order_isSuccess: false,
  Get_an_order_isLoading: false,
  Get_an_order_message: null,

  Get_all_favourites_data: null,
  Get_all_favourites_isError: false,
  Get_all_favourites_isSuccess: false,
  Get_all_favourites_isLoading: false,
  Get_all_favourites_message: null,
};

export const Get_all_orders = createAsyncThunk(
  "OrderSlice/Get_all_orders",
  async (orderStatus, thunkAPI) => {
    // console.log({data: body, order: orderStatus})
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
        url: `${API_BASEURL}v1/customer/orders?status=${orderStatus}&payment_status= &per_page=`,
        headers: config.headers,
        data: {
          cart_id: 1,
          use_points: true,
          use_wallet: true,
          address_id: 1,
        }, // Include body here
      });
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

export const Get_an_order = createAsyncThunk(
  "OrderSlice/Get_an_order",
  async (params, thunkAPI) => {
    // console.log({data: body, order: orderStatus})
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
        url: `${API_BASEURL}v1/customer/orders/${params}`,
        headers: config.headers,
        data: {
          cart_id: 1,
          use_points: true,
          use_wallet: true,
          address_id: 1,
        }, // Include body here
      });
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

export const Get_all_favourites = createAsyncThunk(
  "auth/Get_all_favourites",
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
      const response = await axios.get(
        `${API_BASEURL}v1/customer/favourites`,
        config
      );
      console.log({ favorites: response.data });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      return thunkAPI.rejectWithValue(errorMessage);
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
      })
      .addCase(Get_an_order.pending, (state) => {
        state.Get_an_order_isLoading = true;
      })
      .addCase(Get_an_order.fulfilled, (state, action) => {
        state.Get_an_order_isLoading = false;
        state.Get_an_order_isError = false;
        state.Get_an_order_data = action.payload;
        state.Get_an_order_message = null;
        state.Get_an_order_isSuccess = true;
      })
      .addCase(Get_an_order.rejected, (state, action) => {
        state.Get_an_order_isLoading = false;
        state.Get_an_order_isError = true;
        state.Get_an_order_message = action.payload;
        state.Get_an_order_data = null;
        state.Get_an_order_isSuccess = false;
      })
      .addCase(Get_all_favourites.pending, (state) => {
        state.Get_all_favourites_isLoading = true;
      })
      .addCase(Get_all_favourites.fulfilled, (state, action) => {
        state.Get_all_favourites_isLoading = false;
        state.Get_all_favourites_isError = false;
        state.Get_all_favourites_data = action.payload;
        state.Get_all_favourites_message = null;
        state.Get_all_favourites_isSuccess = true;
      })
      .addCase(Get_all_favourites.rejected, (state, action) => {
        state.Get_all_favourites_isLoading = false;
        state.Get_all_favourites_isError = true;
        state.Get_all_favourites_message = action.payload;
        state.Get_all_favourites_data = null;
        state.Get_all_favourites_isSuccess = false;
      });
  },
});

export const {} = OrderSlice.actions;
export default OrderSlice.reducer;
