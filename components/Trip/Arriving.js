import React, { useState } from "react";
import { Text, View, Pressable, Image, StyleSheet, Modal } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const approved = require("../../assets/blue-approved.png");
import { useNavigation } from "@react-navigation/native";

export default function Arriving() {
  const [showModal, setShowModal] = useState(false);
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

      {/* message */}
      <View style={styles.details}>
        <Text style={{ fontWeight: "700", fontSize: 16, lineHeight: 25.6 }}>
          Arriving your Location
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 25.6 }}>
          The Bus is about to arrive your destination, It will take 2 minutes to
          reach, Get Ready
        </Text>
      </View>

      {/* modal */}
      <Modal visible={showModal} animationType="slide">
        <Pressable
          onPress={() => {
            setShowModal(false);
            setTimeout(() => {
              navigation.navigate("Rating");
            }, 300);
          }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Image source={approved} />
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              lineHeight: 25.6,
              color: "#04262F",
            }}
          >
            Arrived Your Destination
          </Text>
          <Text style={{ fontSize: 12, color: "#04262F", lineHeight: 19.2 }}>
            You have gotten to your destination
          </Text>
        </Pressable>
      </Modal>

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
          onPress={() => setShowModal(true)}
        >
          <Image source={menuBtn} />
        </Pressable>
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
    height: "70%",
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
    gap: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: -10,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});
