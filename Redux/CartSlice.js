import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "./shareApi";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_All_Cart_data: null,
  Get_All_Cart_isError: false,
  Get_All_Cart_isSuccess: false,
  Get_All_Cart_isLoading: false,
  Get_All_Cart_message: null,

  Get_Cart_Summary_data: null,
  Get_Cart_Summary_isError: false,
  Get_Cart_Summary_isSuccess: false,
  Get_Cart_Summary_isLoading: false,
  Get_Cart_Summary_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);
    const response = await axiosInstance.get(url, getAxiosConfig(token));

    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log({
    //   mnnn: error?.response?.data,
    // });
    if (error.response) {
      throw new Error(
        `Failed to fetch data: ${error.response.status} - ${
          error.response.data?.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      throw new Error(
        "No response received from the server. Please check your network connection."
      );
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
};

export const Get_all_Cart_Fun = createAsyncThunk(
  "RestaurantSlice/Get_all_Cart_Fun",
  async (query, thunkAPI) => {
    let url = `v1/customer/carts`;
    // if (query?.searchQuery) {
    //   url = `v1/candidates?page=${query?.page}&perPage=${query?.perPage}&search=${query?.searchQuery}`;
    // } else {
    //   url = `v1/candidates?page=${query?.page}&perPage=${query?.perPage}`;
    // }

    // `v1/candidates?page=${query?.page}&`;

    try {
      const response = await fetchResponsData(url, thunkAPI);

      console.log({
        // jnnn: response.data,
      });
      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const Get_Cart_Summary_Fun = createAsyncThunk(
  "RestaurantSlice/Get_Cart_summary_Fun",
  async (query, thunkAPI) => {
    let url = `/v1/customer/carts/${query}/summary`;
    try {
      console.log(url);
      const response = await fetchResponsData(url, thunkAPI);
      return response?.data;
    } catch (error) {
      console.log({ sumary_error: error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching cart summary"
      );
    }
  }
);

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_Cart_Fun.pending, (state) => {
        state.Get_All_Cart_isLoading = true;
      })
      .addCase(Get_all_Cart_Fun.fulfilled, (state, action) => {
        state.Get_All_Cart_isLoading = false;
        state.Get_All_Cart_isError = false;
        state.Get_All_Cart_data = action.payload;
        state.Get_All_Cart_message = null;
        state.Get_All_Cart_isSuccess = true;
      })
      .addCase(Get_all_Cart_Fun.rejected, (state, action) => {
        state.Get_All_Cart_isLoading = false;
        state.Get_All_Cart_isError = true;
        state.Get_All_Cart_message = action.payload;
        state.Get_All_Cart_data = null;
        state.Get_All_Cart_isSuccess = false;
      })
      .addCase(Get_Cart_Summary_Fun.pending, (state) => {
        state.Get_Cart_Summary_isLoading = true;
      })
      .addCase(Get_Cart_Summary_Fun.fulfilled, (state, action) => {
        state.Get_Cart_Summary_isLoading = false;
        state.Get_Cart_Summary_isError = false;
        state.Get_Cart_Summary_data = action.payload;
        state.Get_Cart_Summary_message = null;
        state.Get_Cart_Summary_isSuccess = true;
      })
      .addCase(Get_Cart_Summary_Fun.rejected, (state, action) => {
        state.Get_Cart_Summary_isLoading = false;
        state.Get_Cart_Summary_isError = false;
        state.Get_Cart_Summary_message = action.payload;
        state.Get_Cart_Summary_data = null;
        state.Get_Cart_Summary_isSuccess = false;
      });
  },
});

export const {} = CartSlice.actions;

export default CartSlice.reducer;
