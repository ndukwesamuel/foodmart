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
} from "react-native";
import BeginTrip from "../../../components/Driver/StartTrip/BeginTrip/BeginTrip";
import React, { useState, useEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";

import { Get__Single_driver_Trip_Fun } from "../../../Redux/Driver/DriverTripSLice";
const cancelBtn = require("../../../assets/close-circle.png");

const CancledTrip = () => {
  const { get_single_driver_trip_data } = useSelector(
    (state) => state?.DriverTripSLice
  );

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);

    dispatch(
      Get__Single_driver_Trip_Fun(get_single_driver_trip_data?.route._id)
    );

    // Wait for 2 seconds
    setRefreshing(false);
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        borderWidth: 0.5,
        borderColor: "#D9D9D9",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text>Cancelled Trip</Text>
      <View
        style={{
          // justifyContent: "center",

          flex: 1,
          // backgroundColor: "#25292e",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={require("../../../assets/tick-circle.png")} />

        <Text
          style={{
            fontSize: 16,
            fontWeight: "900",
            lineHeight: 36,
            color: "#04262F",
            textAlign: "center",
          }}
        >
          Cancelled Trip
        </Text>
        <Text>Trip has been Cancelled</Text>
      </View>
    </ScrollView>
  );
};

export default CancledTrip;
