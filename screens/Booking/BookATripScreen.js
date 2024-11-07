import React from "react";

import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { TouchableOpacity } from "react-native-gesture-handler";
import AppScreen from "../../components/shared/AppScreen";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import {
  Get_All_Bustop_Fun,
  Get_All_Routes_Fun,
} from "../../Redux/Rider/RouteSlice";
import { BookATripSlice_reset } from "../../Redux/BookATripSlice";
import BusStop from "../../components/Booking/BookATrip/BusStop";
import Destination from "../../components/Booking/BookATrip/Destination";
import DepartureTime from "../../components/Booking/BookATrip/DepartureTime";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const greenMarker = require("../../assets/greenmarker.png");
const redMarker = require("../../assets/redmarker.png");

const BookATripScreen = ({ navigation }) => {
  const tripDetails = useSelector((state) => state.BookATripSlice);
  const {
    busStop,
    destination: dest,
    time,
  } = useSelector((state) => state?.BookATripSlice);

  const [modalType, setModalType] = useState(null);
  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const { Get_All_Routes_data, get_all_bustops_data } = useSelector(
    (state) => state?.RouteSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_All_Routes_Fun()); //
    dispatch(Get_All_Bustop_Fun()); //

    return () => {};
  }, [dispatch]);

  const closeModal = () => {
    setModalType(null);
  };

  // dispatch(BookATripSlice_reset());

  let time_array = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const pickUp_Data = get_all_bustops_data?.locations?.filter(
    (entry) => entry.pickUp === true
  );
  const destination = get_all_bustops_data?.locations?.filter(
    (entry) => entry.dropOff === true
  );

  return (
    <AppScreen>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 20, right: 30, zIndex: 1 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ gap: 20 }}>
          {/* menu and back button */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <Image source={arrowBack} />
            </Pressable>
            {/* <Pressable>
            <Image source={menuBtn} />
          </Pressable> */}
          </View>

          {/* book a trip */}
          <View style={{ gap: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
                lineHeight: 36,
                color: "#1E0000",
              }}
            >
              Book a Trip
            </Text>

            {/* select containers */}
            <View style={{ gap: 20 }}>
              {/* bus stop */}
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    lineHeight: 18.9,
                    color: "#1E0000",
                  }}
                >
                  Bus Stop{" "}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      lineHeight: 16.2,
                    }}
                  >
                    (your joining point)
                  </Text>
                </Text>
                <Pressable
                  onPress={() => setModalType("bus-stop")}
                  style={styles.selectContainer}
                >
                  <Image source={greenMarker} />

                  {/* busStop */}

                  <View style={{ gap: 5, flexDirection: "row" }}>
                    <Text>{busStop?.LGA},</Text>
                    <Text>{busStop?.name}</Text>
                  </View>
                </Pressable>
              </View>

              {/* Destination */}
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    lineHeight: 18.9,
                    color: "#1E0000",
                  }}
                >
                  Destination{" "}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      lineHeight: 16.2,
                    }}
                  >
                    (your alighting bus stop)
                  </Text>
                </Text>
                <Pressable
                  onPress={() => setModalType("destination")}
                  style={styles.selectContainer}
                >
                  <Image source={redMarker} />

                  <View style={{ gap: 5, flexDirection: "row" }}>
                    <Text>{dest?.LGA},</Text>
                    <Text>{dest?.name}</Text>
                  </View>
                </Pressable>
              </View>
              {/* bus stop */}
              <View style={{ gap: 5 }}>
                <Text
                  style={{
                    fontWeight: "500",
                    lineHeight: 18.9,
                    color: "#1E0000",
                  }}
                >
                  Departure Time
                </Text>
                <Pressable
                  onPress={() => setModalType("departure-time")}
                  style={styles.selectContainer}
                >
                  <Text>{time}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* continue button */}

        {busStop && destination && time && (
          <Pressable
            onPress={() =>
              navigation.navigate("Available-Bus", {
                item: { busStop, dest, time },
              })
            }
            style={{ backgroundColor: "#001272", padding: 10, borderRadius: 8 }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "700",
                lineHeight: 24.05,
              }}
            >
              Continue
            </Text>
          </Pressable>
        )}

        {/* modals */}

        {modalType === "bus-stop" && (
          <BusStop onCloseModal={closeModal} main_data={pickUp_Data} />
        )}
        {modalType === "destination" && (
          <Destination onCloseModal={closeModal} main_data={destination} />
        )}
        {modalType === "departure-time" && (
          <DepartureTime onCloseModal={closeModal} main_data={time_array} />
        )}
      </View>
    </AppScreen>
  );
};

export default BookATripScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },

  selectContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 8,
    gap: 5,
  },
});
