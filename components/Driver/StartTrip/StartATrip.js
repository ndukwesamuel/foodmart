import { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BusStop from "../../Booking/BookATrip/BusStop";
import Destination from "../../Booking/BookATrip/Destination";
import DepartureTime from "../../Booking/BookATrip/DepartureTime";
import { useSelector } from "react-redux";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");

const StartATrip = () => {
  const tripDetails = useSelector((state) => state.BookATripSlice);
  const navigation = useNavigation();
  const [modalType, setModalType] = useState(null);

  const closeModal = () => {
    setModalType(null);
  };

  return (
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
          <Pressable>
            <Image source={menuBtn} />
          </Pressable>
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
            Start a Trip
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
                  style={{ fontSize: 12, fontWeight: "400", lineHeight: 16.2 }}
                >
                  (your joining point)
                </Text>
              </Text>
              <Pressable
                onPress={() => setModalType("bus-stop")}
                style={styles.selectContainer}
              >
                <Image source={greenMarker} />
                <Text>{tripDetails.busStop}</Text>
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
                  style={{ fontSize: 12, fontWeight: "400", lineHeight: 16.2 }}
                >
                  (your alighting bus stop)
                </Text>
              </Text>
              <Pressable
                onPress={() => setModalType("destination")}
                style={styles.selectContainer}
              >
                <Image source={redMarker} />
                <Text>{tripDetails.destination}</Text>
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
                <Text>{tripDetails.time}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* continue button */}
      <Pressable
        onPress={() => navigation.navigate("Driver-Available-Route")}
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

      {/* modals */}

      {modalType === "bus-stop" && <BusStop onCloseModal={closeModal} />}
      {modalType === "destination" && <Destination onCloseModal={closeModal} />}
      {modalType === "departure-time" && (
        <DepartureTime onCloseModal={closeModal} />
      )}
    </View>
  );
};

export default StartATrip;

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
