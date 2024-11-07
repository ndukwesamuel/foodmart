import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
const arrowBack = require("../../../../assets/arrow-back.png");
const menuBtn = require("../../../../assets/menu-button.png");
import { useNavigation, useRoute } from "@react-navigation/native";
import BeginTripDetails from "./BeginTripDetails";
import PassengerDetails from "./PassengerDetails";
import StartModal from "./StartModal";
import PaymentMutation from "../../../../utills/PaymentMutation";
import { useSelector, useDispatch } from "react-redux";
import StartTripMutation from "../../../../utills/StartTripMutation";
import { Get__Single_driver_Trip_Fun } from "../../../../Redux/Driver/DriverTripSLice";

const redMarker = require("../../../../assets/redmarker.png");
const line = require("../../../../assets/arrow-line.png");
const arrowRight = require("../../../../assets/arrow-left.png");
const greenMarker = require("../../../../assets/greenmarker.png");

const BeginTrip = () => {
  const navigation = useNavigation();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const { item } = useRoute()?.params;
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

  const toggleDetailsModal = (state) => {
    setShowDetailsModal(state);
  };

  console.log({
    sccc: item,
  });

  const toggleStartModal = (state) => {
    setShowStartModal(state);
  };

  const list = [{}, {}, {}, {}, {}, {}, {}];

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 3 hours in seconds
  const [isButtonClickable, setIsButtonClickable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const currentTime = new Date();
    const departureDateTime = new Date(
      item.departureDate + "T" + item.departureTime
    );

    if (currentTime.getTime() === departureDateTime.getTime()) {
      setIsButtonClickable(true);
    } else {
      setIsButtonClickable(false);
    }

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const StartTripMutation_Instance = StartTripMutation(
    user_data.token,
    dispatch
  );
  // userProfile_Data,
  // dispatch

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/mapimage.png")}
        style={{ width: "100%", height: 200 }}
      />

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
        <View style={{ gap: 10 }}>
          {/* heading */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "900",
              lineHeight: 36,
              color: "#04262F",
              textAlign: "center",
            }}
          >
            Your Trip Start In
          </Text>

          {/* timer */}
          <View style={{ alignSelf: "center", flexDirection: "row", gap: 10 }}>
            {/* hour */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  borderWidth: 0.5,
                  height: 48,
                  width: 46,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}
                >
                  {hours.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text>Hour</Text>
            </View>

            {/* min */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  borderWidth: 0.5,
                  height: 48,
                  width: 46,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}
                >
                  {minutes.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text>Min</Text>
            </View>

            {/* sec */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  borderWidth: 0.5,
                  height: 48,
                  width: 46,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "700", fontSize: 18, lineHeight: 22 }}
                >
                  {seconds.toString().padStart(2, "0")}
                </Text>
              </View>
              <Text>Sec</Text>
            </View>
          </View>

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
                <Text style={{ lineHeight: 21.04 }}>{item?.pickUp}</Text>
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
                <Text style={{ lineHeight: 21.04 }}>{item?.dropOff}</Text>
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
                {item?.departureTime}
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
                {item?.name}
              </Text>
            </View>
          </View>

          <FlatList
            style={{
              borderWidth: 1,
              borderRadius: 12,
              paddingBottom: 10,
              height: "45%",
            }}
            data={item?.passengers}
            ListHeaderComponent={
              <View style={{ paddingBottom: 10, padding: 10 }}>
                <Text
                  style={{ lineHeight: 24.05, fontSize: 16, fontWeight: "700" }}
                >
                  10 Passengers
                </Text>
              </View>
            }
            renderItem={({ item: itemData }) => (
              <Pressable
                onPress={() => toggleDetailsModal(true)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  borderBottomWidth: 0.5,
                }}
              >
                <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
                  {itemData?.passenger?.userName} {itemData?.pickUp}
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
                    {itemData?.code}
                  </Text>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={arrowRight}
                  />
                </View>
              </Pressable>
            )}
          />

          {/* passenger list */}
        </View>

        {/* buttons */}
        <View style={{ gap: 5, padding: 10 }}>
          {/* when we push the button */}
          <Pressable
            onPress={() => {
              if (isButtonClickable) {
                toggleStartModal(true);
              } else {
                StartTripMutation_Instance.mutate({
                  status: "ongoing",
                });
              }
            }}
            // style={[
            //   styles.startTripButton,
            //   { opacity: isButtonClickable ? 1 : 0.5 },
            // ]}

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
              Start Trip
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
      {/* modals */}
      {showDetailsModal && (
        <PassengerDetails onHideModal={toggleDetailsModal} />
      )}
      {showStartModal && <StartModal onHideModal={toggleStartModal} />}

      {/* top buttons */}
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.topBtn, { justifyContent: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
        {/* <Pressable
          style={[styles.topBtn, { padding: 3 }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={menuBtn} />
        </Pressable> */}
      </View>
    </View>
  );
};

export default BeginTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "20%",
  },

  topBtns: {
    position: "absolute",
    top: 50,
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
