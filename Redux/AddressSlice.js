import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "./shareApi";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_all_addresses_data: null,
  Get_all_addresses_isError: false,
  Get_all_addresses_isSuccess: false,
  Get_all_addresses_isLoading: false,
  Get_all_addresses_message: null,

  Get_an_address_data: null,
  Get_an_address_isError: false,
  Get_an_address_isSuccess: false,
  Get_an_address_isLoading: false,
  Get_an_address_message: null,
};

export const Get_all_addresses = createAsyncThunk(
  "AddressSlice/Get_all_addresses",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASEURL}v1/customer/addresses`,
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const Get_an_address = createAsyncThunk(
  "AddressSlice/Get_an_address",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASEURL}v1/customer/addresses/:${data}`,
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const AddressSlice = createSlice({
  name: "AddressSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_addresses.pending, (state) => {
        state.Get_all_addresses_isLoading = true;
      })
      .addCase(Get_all_addresses.fulfilled, (state, action) => {
        state.Get_all_addresses_isLoading = false;
        state.Get_all_addresses_isError = false;
        state.Get_all_addresses_data = action.payload;
        state.Get_all_addresses_message = null;
        state.Get_all_addresses_isSuccess - true;
      })
      .addCase(Get_all_addresses.rejected, (state, action) => {
        state.Get_all_addresses_isLoading = false;
        state.Get_all_addresses_isError = true;
        state.Get_all_addresses_message = action.payload;
        state.Get_all_addresses_data = null;
        state.Get_all_addresses_isSuccess = false;
      })
      .addCase(Get_an_address.pending, (state) => {
        state.Get_an_address_isLoading = true;
      })
      .addCase(Get_an_address.fulfilled, (state, action) => {
        state.Get_an_address_isLoading = false;
        state.Get_an_address_isError = false;
        state.Get_an_address_data = action.payload;
        state.Get_an_address_message = null;
        state.Get_an_address_isSuccess = true;
      })
      .addCase(Get_an_address.rejected, (state, action) => {
        state.Get_an_address_isLoading = false;
        state.Get_an_address_isError = true;
        state.Get_an_address_message = action.payload;
        state.Get_an_address_data = null;
        state.Get_an_address_isSuccess = false;
      });
  },
});

export const {} = AddressSlice.actions
export default AddressSlice.reducer