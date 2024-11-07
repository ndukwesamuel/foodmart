import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  Get__Single_driver_Trip_Fun,
  reset_get_single_driver_trip_Fun,
} from "../../Redux/Driver/DriverTripSLice";
import BeginTripScreen from "./StartTrip/BeginTripScreen";
import CancledTrip from "./StartTrip/CancledTrip";
import DOnGoingTripScreen from "./StartTrip/DOnGoingTripScreen";
import StartTripMutation from "../../utills/StartTripMutation";
import ArrivingScreen from "../Trip/ArrivingScreen";
import Arriving from "../../components/Trip/Arriving";
import AriveDestination from "./AriveDestination";
const arrowBack = require("../../assets/arrow-back.png");

const DriverTrip = () => {
  const dispatch = useDispatch();
  const { item } = useRoute()?.params;
  const navigation = useNavigation();

  const { get_single_driver_trip_data, get_single_driver_trip_isLoading } =
    useSelector((state) => state?.DriverTripSLice);
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);

  const StartTripMutation_Instance = StartTripMutation(user_data.token, item);

  useEffect(() => {
    const fetchTripData = async () => {
      await dispatch(Get__Single_driver_Trip_Fun(item?._id));
    };

    fetchTripData();

    return () => {
      dispatch(reset_get_single_driver_trip_Fun());
    };
  }, [dispatch, item?._id]);

  useEffect(() => {
    if (StartTripMutation_Instance?.isSuccess) {
      dispatch(Get__Single_driver_Trip_Fun(item?._id));
    }
  }, [StartTripMutation_Instance?.isSuccess, dispatch, item?._id]);

  const onRetry = () => {
    dispatch(Get__Single_driver_Trip_Fun(item?._id));
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "relative",
          top: 50,
          left: 20,
          right: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <Pressable
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            padding: 6,
            borderRadius: 6,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
      </View>

      <>
        {get_single_driver_trip_data ? (
          <View style={{ flex: 1 }}>
            {get_single_driver_trip_data?.route?.status === "pending" && (
              <BeginTripScreen />
            )}

            {get_single_driver_trip_data?.route?.status === "ongoing" && (
              <DOnGoingTripScreen />
            )}

            {/* 'completed' or 'cancelled'" */}

            {get_single_driver_trip_data?.route?.status === "cancelled" && (
              <CancledTrip />
            )}

            {get_single_driver_trip_data?.route?.status === "completed" && (
              <AriveDestination />
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#721c24",
                marginBottom: 20,
                textAlign: "center",
                paddingHorizontal: 20,
              }}
            >
              <ActivityIndicator size="large" color="#001272" />
            </Text>
          </View>
        )}
      </>
    </View>
  );
};

export default DriverTrip;
