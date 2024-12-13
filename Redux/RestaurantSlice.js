import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "../shareApi";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_All_Restaurant_data: null,
  Get_All_Restaurant_isError: false,
  Get_All_Restaurant_isSuccess: false,
  Get_All_Restaurant_isLoading: false,
  Get_All_Restaurant_message: null,
};

export const Get_all_restaurants = createAsyncThunk(
  "RestaurantSlice/Get_all_restaurants",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASEURL}v1/customer/restaurants`,
        config
      );

      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const RestaurantSlice = createSlice({
    name:"RestaurantSlice",
    initialState,
    reducers:{

    },
    
})
