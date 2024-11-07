import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  StatusBar,
  SafeAreaView,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
import * as Location from "expo-location";

const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/arrow-line.png");
const arrowRight = require("../../../assets/arrow-left.png");
import { useNavigation, useRoute } from "@react-navigation/native";
import OnGoingTripDetails from "../../../components/Driver/StartTrip/OnGoingTrip/OnGoingTripDetails";
import PassengerDetails from "../../../components/Driver/StartTrip/BeginTrip/PassengerDetails";
import StartTripMutation from "../../../utills/StartTripMutation";
import { useSelector, useDispatch } from "react-redux";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Polyline,
} from "react-native-maps";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import {
  Driver_trip_Fun,
  Get__Single_driver_Trip_Fun,
} from "../../../Redux/Driver/DriverTripSLice";
const { width, height } = Dimensions.get("window");
const marker = require("../../../assets/greenmarker.png");
const arrowLeft = require("../../../assets/arrow-left.png");
const DOnGoingTripScreen = () => {
  const navigation = useNavigation();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

  const {
    get_single_driver_trip_data,
    driver_trip_data,
    driver_trip_isLoading,
  } = useSelector((state) => state?.DriverTripSLice);

  const toggleDetailsModal = (state) => {
    setShowDetailsModal(state);
  };

  const list = [
    {
      name: "Tosin Makinde",
      bookingNumber: "453",
      pickupPoint: "Ojuelegba Shitta",
    },
    {
      name: "Samuel John",
      bookingNumber: "353",
      pickupPoint: "Marina CSM",
    },
  ];

  const [isButtonClickable, setIsButtonClickable] = useState(false);

  const StartTripMutation_Instance = StartTripMutation(
    user_data.token,
    dispatch
  );

  useEffect(() => {
    dispatch(
      Get__Single_driver_Trip_Fun(get_single_driver_trip_data?.route._id)
    );
    return () => {};
  }, [driver_trip_data]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Obtain the location name using reverse geocoding with OSM Nominatim
      try {
        const { latitude, longitude } = location?.coords;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        setLocationName(data.display_name);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName("Unknown Location");
      }
    })();

    dispatch(UserProfile_Fun());
  }, []);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.006339428281933124;
  const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

  const INITIAL_POSITION = {
    latitude: location?.latitude,
    longitude: location?.longitude,
    // latitude: 6.549405360528134,
    // longitude: 3.366228245355276,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.container}>
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : location ? (
            <>
              <MapView
                style={{
                  width: "100%",
                  height: "60%",
                }}
                provider={PROVIDER_GOOGLE}
                // initialRegion={{
                //   latitude: location.latitude,
                //   longitude: location.longitude,
                //   latitudeDelta: 0.5922,
                //   longitudeDelta: 0.5421,
                // }}
                initialRegion={INITIAL_POSITION}
              >
                {location && (
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                  >
                    <Callout>
                      <View style={{ flexDirection: "row", padding: 10 }}>
                        <Image source={greenMarker} style={styles.markerIcon} />
                        <View>
                          <Text>Your Location</Text>
                        </View>
                      </View>
                    </Callout>
                  </Marker>
                )}

                {/* 6.452303912884004, 3.5936961771704445 */}
              </MapView>

              <View style={{ gap: 10, flex: 1 }}>
                {/* heading */}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "900",
                    lineHeight: 36,
                    color: "#04262F",
                  }}
                >
                  Ongoing Trip
                </Text>

                {/* bus stations */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 5,
                    paddingHorizontal: 15,
                  }}
                >
                  {/* left */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image source={greenMarker} />
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#1E0000",
                          opacity: 0.4,
                          lineHeight: 18.04,
                        }}
                      >
                        Pickup Bus stop
                      </Text>
                      <Text style={{ lineHeight: 21.04 }}>
                        {get_single_driver_trip_data?.route?.pickUp}
                      </Text>
                    </View>
                  </View>

                  {/* center */}
                  <View
                    style={{
                      width: "30%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image source={line} style={{ width: "90%" }} />
                    <Image
                      source={arrowRight}
                      style={{ height: 10, marginLeft: -5 }}
                    />
                  </View>

                  {/* right */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Image source={redMarker} />
                    <View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#1E0000",
                          opacity: 0.4,
                          lineHeight: 18.04,
                        }}
                      >
                        Dropoff Bus stop
                      </Text>
                      <Text style={{ lineHeight: 21.04, flexWrap: "wrap" }}>
                        {get_single_driver_trip_data?.route?.dropOff}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* DEPARTMENT TIME */}
                <View
                  style={{
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: "#1E000033",
                    borderRadius: 12,
                    gap: 10,
                  }}
                >
                  {/* Departure time */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 24.05,
                        color: "#1E0000",
                      }}
                    >
                      Departure time
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: 24.05,
                        color: "#1E0000",
                      }}
                    >
                      {get_single_driver_trip_data?.route?.departureTime}
                    </Text>
                  </View>

                  {/* route */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 24.05,
                        color: "#1E0000",
                      }}
                    >
                      Route
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: 24.05,
                        color: "#1E0000",
                      }}
                    >
                      {get_single_driver_trip_data?.route?.name}
                    </Text>
                  </View>
                </View>

                {/* passenger list */}
                <View style={{ flex: 1 }}>
                  <View style={{ gap: 5, padding: 0 }}>
                    <Pressable
                      onPress={() =>
                        dispatch(
                          Driver_trip_Fun({
                            status: "completed",
                            id: get_single_driver_trip_data?.route?._id,
                          })
                        )
                      }
                      style={[
                        styles.startTripButton,
                        {
                          backgroundColor: "#001272",
                          padding: 10,
                          borderRadius: 8,
                        }, // Change background color based on clickability
                      ]}

                      // disabled={!isButtonClickable}
                    >
                      {driver_trip_isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 16,
                            fontWeight: "700",
                            lineHeight: 24.05,
                          }}
                        >
                          End Trip
                        </Text>
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
        {/* route details */}
        {/* <OnGoingTripDetails onShowDetailsModal={toggleDetailsModal} /> */}

        {/* modals */}
        {showDetailsModal && (
          <PassengerDetails onHideModal={toggleDetailsModal} />
        )}

        {/* top buttons */}
        <View style={styles.topBtns}>
          {/* <Pressable
            style={[styles.topBtn, { justifyContent: "center" }]}
            onPress={() => navigation.goBack()}
          >
            <Image source={arrowBack} />
          </Pressable> */}
          <Pressable
            style={[styles.topBtn, { padding: 3 }]}
            // onPress={() => navigation.goBack()}
            onPress={() => navigation.toggleDrawer()}
          >
            <Image source={menuBtn} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "35%",
  },

  topBtns: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  topBtn: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
  },
});
export default DOnGoingTripScreen;
