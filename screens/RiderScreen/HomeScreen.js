import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  ActivityIndicator,
  Pressable,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun } from "../../Redux/AuthSlice";
import AppScreen from "../../components/shared/AppScreen";
const marker = require("../../assets/greenmarker.png");
const arrowLeft = require("../../assets/arrow-left.png");

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const { user_profile_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

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
    <AppScreen>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 80, right: 30, zIndex: 1 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
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
                <Text
                  style={{
                    textAlign: "center",
                    color: "#001272",
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  {`Hello  ${user_profile_data?.userProfile?.userId?.userName} Nice having you here
`}
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
                      Book your bus trip months ahead of time to avoid the rush.
                    </Text>
                  </View>
                  <Image source={arrowLeft} />
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
    </AppScreen>
  );
};

export default HomeScreen;

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
    height: "35%",
  },

  welcome: {
    backgroundColor: "#00127233",
    padding: 20,
  },

  trip: {
    backgroundColor: "white",
    flex: 1,
    padding: 30,
    gap: 20,
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
