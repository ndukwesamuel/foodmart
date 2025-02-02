import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

import Toast from "react-native-toast-message";
import { handleApiError } from "./shareApi";
import { axiosInstance, getAxiosConfig, getToken } from "./ApiConfig";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const initialState = {
  Get_All_Restaurant_data: null,
  Get_All_Restaurant_isError: false,
  Get_All_Restaurant_isSuccess: false,
  Get_All_Restaurant_isLoading: false,
  Get_All_Restaurant_message: null,

  Get__Restaurant_detail_data: null,
  Get__Restaurant_detail_isError: false,
  Get__Restaurant_detail_isSuccess: false,
  Get__Restaurant_detail_isLoading: false,
  Get__Restaurant_detail_message: null,

  featured_restaurant_data: null,
  featured_restaurant_isError: false,
  featured_restaurant_isSuccess: false,
  featured_restaurant_isLoading: false,
  featured_restaurant_message: null,

  all_menu_item_for_resturant_data: null,
  all_menu_item_for_resturant_isError: false,
  all_menu_item_for_resturant_isSuccess: false,
  all_menu_item_for_resturant_isLoading: false,
  all_menu_item_for_resturant_message: null,
};

const fetchResponsData = async (url, thunkAPI) => {
  try {
    const token = getToken(thunkAPI);
    const response = await axiosInstance.get(url, getAxiosConfig(token));

    return response.data;
  } catch (error) {
    console.log({
      mnnn: error?.response?.data,
    });
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

export const Featured_restaurant_data_Fun = createAsyncThunk(
  "RestaurantSlice/Featured_restaurant_data_Fun",
  async (query, thunkAPI) => {
    let url = `v1/customer/restaurants/featured`;
    // if (query?.searchQuery) {
    //   url = `v1/candidates?page=${query?.page}&perPage=${query?.perPage}&search=${query?.searchQuery}`;
    // } else {
    //   url = `v1/candidates?page=${query?.page}&perPage=${query?.perPage}`;
    // }

    // `v1/candidates?page=${query?.page}&`;

    try {
      const response = await fetchResponsData(url, thunkAPI);

      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const Get_All_Menu_Items_For_A_Resturant_Fun = createAsyncThunk(
  "RestaurantSlice/Get_All_Menu_Items_For_A_Resturant_Fun",
  async (query, thunkAPI) => {
    let url;

    if (query?.categoryId) {
      url = `v1/customer/restaurants/${query?.id}/menu-items?category_id=${query?.categoryId}`;
    } else {
      url = `v1/customer/restaurants/${query?.id}/menu-items`;
    }

    try {
      const response = await fetchResponsData(url, thunkAPI);

      return response?.data;
    } catch (error) {
      console.log({ error });
      return thunkAPI.rejectWithValue(
        error.message || "An error occurred while fetching candidate profile"
      );
    }
  }
);

export const Get_all_restaurants = createAsyncThunk(
  "RestaurantSlice/Get_all_restaurants",
  async (data, thunkAPI) => {
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASEURL}v1/customer/restaurants?page=${data}&per_page=100`,
        config
      );

      return response.data;
    } catch (error) {
      // const errorMessage = handleApiError(error);
      // return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Get_single_restaurants = createAsyncThunk(
  "RestaurantSlice/Get_single_restaurants",
  async (id, thunkAPI) => {
    console.log({
      ggg: id,
    });
    try {
      let token = thunkAPI.getState()?.Auth?.user_data?.data?.token;
      console.log({ nn: token });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASEURL}v1/customer/restaurants/${id}`,
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
  name: "RestaurantSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Get_all_restaurants.pending, (state) => {
        state.Get_All_Restaurant_isLoading = true;
      })
      .addCase(Get_all_restaurants.fulfilled, (state, action) => {
        state.Get_All_Restaurant_isLoading = false;
        state.Get_All_Restaurant_isError = false;
        state.Get_All_Restaurant_data = action.payload;
        state.Get_All_Restaurant_message = null;
        state.Get_All_Restaurant_isSuccess = true;
      })
      .addCase(Get_all_restaurants.rejected, (state, action) => {
        state.Get_All_Restaurant_isLoading = false;
        state.Get_All_Restaurant_isError = true;
        state.Get_All_Restaurant_message = action.payload;
        state.Get_All_Restaurant_data = null;
        state.Get_All_Restaurant_isSuccess = false;
      })
      .addCase(Get_single_restaurants.pending, (state) => {
        state.Get__Restaurant_detail_isLoading = true;
      })
      .addCase(Get_single_restaurants.fulfilled, (state, action) => {
        state.Get__Restaurant_detail_isLoading = false;
        state.Get__Restaurant_detail_isError = false;
        state.Get__Restaurant_detail_data = action.payload;
        state.Get__Restaurant_detail_message = null;
        state.Get__Restaurant_detail_isSuccess = true;
      })
      .addCase(Get_single_restaurants.rejected, (state, action) => {
        state.Get__Restaurant_detail_isLoading = false;
        state.Get__Restaurant_detail_isError = true;
        state.Get__Restaurant_detail_message = action.payload;
        state.Get__Restaurant_detail_data = null;
        state.Get__Restaurant_detail_isSuccess = false;
      })
      .addCase(Featured_restaurant_data_Fun.pending, (state) => {
        state.featured_restaurant_isLoading = true;
      })
      .addCase(Featured_restaurant_data_Fun.fulfilled, (state, action) => {
        state.featured_restaurant_isLoading = false;
        state.featured_restaurant_isError = false;
        state.featured_restaurant_data = action.payload;
        state.featured_restaurant_message = null;
        state.featured_restaurant_isSuccess = true;
      })
      .addCase(Featured_restaurant_data_Fun.rejected, (state, action) => {
        state.featured_restaurant_isLoading = false;
        state.featured_restaurant_isError = true;
        state.featured_restaurant_message = action.payload;
        state.featured_restaurant_data = null;
        state.featured_restaurant_isSuccess = false;
      })
      .addCase(Get_All_Menu_Items_For_A_Resturant_Fun.pending, (state) => {
        state.all_menu_item_for_resturant_isLoading = true;
      })
      .addCase(
        Get_All_Menu_Items_For_A_Resturant_Fun.fulfilled,
        (state, action) => {
          state.all_menu_item_for_resturant_isLoading = false;
          state.all_menu_item_for_resturant_isError = false;
          state.all_menu_item_for_resturant_data = action.payload;
          state.all_menu_item_for_resturant_message = null;
          state.all_menu_item_for_resturant_isSuccess = true;
        }
      )
      .addCase(
        Get_All_Menu_Items_For_A_Resturant_Fun.rejected,
        (state, action) => {
          state.all_menu_item_for_resturant_isLoading = false;
          state.all_menu_item_for_resturant_isError = true;
          state.featured_restaurant_message = action.payload;
          state.all_menu_item_for_resturant_message = null;
          state.all_menu_item_for_resturant_isSuccess = false;
        }
      );
  },
});

export const {} = RestaurantSlice.actions;

export default RestaurantSlice.reducer;
