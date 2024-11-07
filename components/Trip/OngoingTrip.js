import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import Map from "../shared/Map";

const { width, height } = Dimensions.get("window");

export default function OngoingTrip() {
  const navigation = useNavigation();
  const { item } = useRoute()?.params;
  console.log({
    item: item,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location?.requestForegroundPermissionsAsync();
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
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "80%",
        }}
      >
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : location ? (
          <>
            <MapView
              style={{
                width: "100%",
                height: "100%",
              }}
              provider={PROVIDER_GOOGLE}
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
                    {/* <Image
                source={marker}
                style={{ width: 20, height: 20, backgroundColor: "red" }}
              /> */}
                    <View>
                      <Text
                        style={{ fontSize: 12, opacity: 0.4, color: "#1E0000" }}
                      >
                        Pick up Bus Station
                      </Text>
                      <Text style={{ fontSize: 14 }}>Ikeja Along</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
              <Marker
                coordinate={{
                  latitude: 6.4478,
                  longitude: 3.4723,
                }}
              >
                <Callout>
                  <View style={{ flexDirection: "row", padding: 10 }}>
                    {/* <Image
                source={marker}
                style={{ width: 20, height: 20, backgroundColor: "red" }}
              /> */}
                    <View>
                      <Text
                        style={{ fontSize: 12, opacity: 0.4, color: "#1E0000" }}
                      >
                        Dropoff Bus Station
                      </Text>
                      <Text style={{ fontSize: 14 }}>Lekki phase 1</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
            </MapView>
          </>
        ) : (
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>

      {/* message */}
      <View style={styles.details}>
        <DepartureTimer departureDateTime={item?.routeId?.departureDate} />
      </View>

      {/* top buttons */}
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.topBtn, { justifyContent: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
        <TouchableOpacity
          style={[styles.topBtn, { padding: 3 }]}
          onPress={() => navigation.toggleDrawer()}
        >
          <Image source={menuBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "80%",
  },

  topBtns: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topBtn: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
  },

  details: {
    flex: 1,
    // gap: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // marginTop: -10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});

// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';

const DepartureTimer = ({ departureDateTime }) => {
  console.log({
    rrr: departureDateTime,
  });
  const [timeRemaining, setTimeRemaining] = useState("");

  const calculateTimeRemaining = (departureDateTime) => {
    const departureDate = new Date(departureDateTime);
    const currentDate = new Date();

    if (currentDate < departureDate) {
      const timeDiff = departureDate - currentDate;
      const hoursRemaining = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesRemaining = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
      );
      return `Thank you for choosing us. Departure in ${hoursRemaining} hours and ${minutesRemaining} minutes`;
    } else {
      const lateHours = Math.floor(
        (currentDate - departureDate) / (1000 * 60 * 60)
      );
      const lateMinutes = Math.floor(
        ((currentDate - departureDate) % (1000 * 60 * 60)) / (1000 * 60)
      );
      return `You are ${lateHours} hours and ${lateMinutes} minutes late`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = calculateTimeRemaining(departureDateTime);
      setTimeRemaining(timeRemaining);
    }, 100); // Update every minute

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [departureDateTime]);

  return (
    <View>
      <Text style={{ fontWeight: "700", fontSize: 16, lineHeight: 25.6 }}>
        Ongoing Trip
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 25.6 }}>{timeRemaining}</Text>
    </View>
  );
};
