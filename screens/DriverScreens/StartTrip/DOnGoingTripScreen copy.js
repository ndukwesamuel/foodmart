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
import { useNavigation } from "@react-navigation/native";
import OnGoingTripDetails from "../../../components/Driver/StartTrip/OnGoingTrip/OnGoingTripDetails";
import PassengerDetails from "../../../components/Driver/StartTrip/BeginTrip/PassengerDetails";
import StartTripMutation from "../../../utills/StartTripMutation";
import { useSelector, useDispatch } from "react-redux";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
const { width, height } = Dimensions.get("window");
const marker = require("../../../assets/greenmarker.png");
const arrowLeft = require("../../../assets/arrow-left.png");
const DOnGoingTripScreen = () => {
  const navigation = useNavigation();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

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
        const { latitude, longitude } = location.coords;
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
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // initialRegion={{
                //   latitude: location.latitude,
                //   longitude: location.longitude,
                //   latitudeDelta: 0.5922,
                //   longitudeDelta: 0.5421,
                // }}
                initialRegion={INITIAL_POSITION}
              >
                <Marker
                  coordinate={{
                    latitude: location?.latitude,
                    longitude: location?.longitude,
                  }}
                >
                  <Callout>
                    <View style={{ flexDirection: "row", padding: 10 }}>
                      <Image
                        source={marker}
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: "red",
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            opacity: 0.4,
                            color: "#1E0000",
                          }}
                        >
                          Your Location
                        </Text>
                        <Text style={{ fontSize: 14 }}>{locationName}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              </MapView>
              <View style={styles.bottomContainer}>
                {/* welcome */}
                <View style={styles.welcome}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#001272",
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    Hello
                    {user_profile_data?.userProfile?.userId?.userName}, Nice
                    having you here
                  </Text>
                </View>

                {/* choose a trip */}
                <View style={styles.trip}>
                  {/* where */}
                  <Pressable
                    style={styles.where}
                    onPress={() => navigation.navigate("Book-A-Trip")}
                  >
                    <Image source={marker} />
                    <Text>Where do you want to go?</Text>
                  </Pressable>

                  {/* schedule */}
                  <Pressable
                    onPress={() => navigation.navigate("Book-A-Trip")}
                    style={styles.schedule}
                  >
                    <View style={{ gap: 10, width: "90%" }}>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        Schedule a Trip
                      </Text>
                      <Text style={{ fontSize: 12, lineHeight: 18 }}>
                        Book your bus trip months ahead of time to avoid the
                        rush.
                      </Text>
                    </View>
                    <Image source={arrowLeft} />
                  </Pressable>
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

        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            marginTop: -10,
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {/* container details */}
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
              }}
            >
              {/* left */}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                  <Text style={{ lineHeight: 21.04 }}>Ikeja Along</Text>
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
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                  <Text style={{ lineHeight: 21.04 }}>Lekki Phase 1...</Text>
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
                  style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}
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
                  8:30 AM
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
                  style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}
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
                  Surelere Staudium Way
                </Text>
              </View>
            </View>

            {/* passenger list */}
            <View style={{ flex: 1, gap: 20 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "700", lineHeight: 24.05 }}
              >
                {/* Picking Up Rideer */}
                Dropping Off Rider
              </Text>
              <FlatList
                style={{ borderRadius: 12, paddingBottom: 10 }}
                data={list}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => {
                      setActiveItem(index);
                      toggleDetailsModal(true);
                    }}
                    style={[
                      {
                        borderWidth: 0.5,
                        padding: 10,
                        borderColor: "#1E000033",
                        borderRadius: 12,
                        gap: 10,
                        marginBottom: 20,
                        backgroundColor:
                          activeItem === index ? "#E3F3FF" : "white",
                      },
                    ]}
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
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          lineHeight: 24.05,
                          color: "#1E0000",
                        }}
                      >
                        {item.bookingNumber}
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
                        Picking Point
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          lineHeight: 24.05,
                          color: "#1E0000",
                        }}
                      >
                        {item.pickupPoint}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />

              <View style={{ gap: 5, padding: 10 }}>
                {/* when we push the button */}
                <Pressable
                  // onPress={() => {
                  //   console.log("kkkkk");
                  //   // navigation.navigate("DriverHome");

                  //   if (isButtonClickable) {
                  //     toggleStartModal(true);
                  //   } else {
                  //     // StartTripMutation_Instance.mutate({
                  //     //   status: "success",
                  //     // });

                  //     navigation.navigate("DriverHome");
                  //   }
                  // }}
                  // style={[
                  //   styles.startTripButton,
                  //   { opacity: isButtonClickable ? 1 : 0.5 },
                  // ]}

                  onPress={() => {
                    // toggleStartModal(true);

                    console.log({
                      status: "success",
                    });
                  }}
                  style={[
                    styles.startTripButton,
                    {
                      backgroundColor: isButtonClickable ? "#001272" : "red",

                      padding: 10,
                      borderRadius: 8,
                    }, // Change background color based on clickability
                  ]}
                  // disabled={!isButtonClickable}
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
                    End Trip
                  </Text>
                </Pressable>
                {/* <Pressable
            onPress={() => 
              
              toggleStartModal(true)}
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
              Start Trip
            </Text>
          </Pressable> */}
              </View>
            </View>
          </View>
        </View>

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
