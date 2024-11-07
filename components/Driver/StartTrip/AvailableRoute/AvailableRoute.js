import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
const arrowBack = require("../../../../assets/arrow-back.png");
const menuBtn = require("../../../../assets/menu-button.png");
import { useNavigation } from "@react-navigation/native";
import AvailableRouteInfo from "./AvailableRouteInfo";

const AvailableRoute = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.5941,
          longitude: 3.3362,
          latitudeDelta: 0.5922,
          longitudeDelta: 0.5421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 6.5941,
            longitude: 3.3362,
          }}
        >
          <Callout>
            <View style={{ flexDirection: "row", padding: 10 }}>
              {/* <Image
                source={marker}
                style={{ width: 20, height: 20, backgroundColor: "red" }}
              /> */}
              <View>
                <Text style={{ fontSize: 12, opacity: 0.4, color: "#1E0000" }}>
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
                <Text style={{ fontSize: 12, opacity: 0.4, color: "#1E0000" }}>
                  Dropoff Bus Station
                </Text>
                <Text style={{ fontSize: 14 }}>Lekki phase 1</Text>
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>

      {/* route details */}
      <AvailableRouteInfo />

      {/* top buttons */}
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.topBtn, { justifyContent: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
        <Pressable
          style={[styles.topBtn, { padding: 3 }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={menuBtn} />
        </Pressable>
      </View>
    </View>
  );
};

export default AvailableRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "45%",
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
});
