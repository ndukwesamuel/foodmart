import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
const marker = require("../../../assets/greenmarker.png");
const arrowLeft = require("../../../assets/arrow-left.png");

export default function DriverHome() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);

  // getting and setting location
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
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.5922,
              longitudeDelta: 0.5421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Callout>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    source={marker}
                    style={{ width: 20, height: 20, backgroundColor: "red" }}
                  />
                  <View>
                    <Text
                      style={{ fontSize: 12, opacity: 0.4, color: "#1E0000" }}
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
              <Text style={{ textAlign: "center", color: "#001272" }}>
                Hello Captian, Nice having you here
              </Text>
            </View>

            {/* choose a trip */}
            <View style={styles.trip}>
              <Text>Your Location</Text>
              {/* where */}
              <Pressable
                onPress={() => navigation.navigate("Driver-Start-Trip")}
                style={styles.where}
              >
                <Image source={marker} />
                <Text>Where do you want to go?</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
  },

  welcome: {
    backgroundColor: "#00127233",
    padding: 20,
  },

  trip: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 30,
    gap: 10,
    justifyContent: "center",
  },

  where: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  schedule: {
    backgroundColor: "#F3F3FF",
    borderWidth: 0.5,
    borderColor: "#F3F3FF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
});
