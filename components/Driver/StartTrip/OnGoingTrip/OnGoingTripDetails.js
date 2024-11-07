import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
const greenMarker = require("../../../../assets/greenmarker.png");
const redMarker = require("../../../../assets/redmarker.png");
const line = require("../../../../assets/arrow-line.png");
const arrowRight = require("../../../../assets/arrow-left.png");
import { useNavigation } from "@react-navigation/native";

const OnGoingTripDetails = ({ onShowDetailsModal }) => {
  const [activeItem, setActiveItem] = useState(0);
  const navigation = useNavigation();

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

  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 3 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      {/* container details */}
      <View style={{ gap: 10, flex: 1 }}>
        {/* heading */}
        <Text style={styles.heading}>Your Trip Start In</Text>

        {/* timer */}
        <View style={{ alignSelf: "center", flexDirection: "row", gap: 10 }}>
          {/* hour */}
          <View style={{ alignItems: "center" }}>
            <View style={styles.timeBox}>
              <Text style={styles.countNum}>
                {hours.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Hour</Text>
          </View>

          {/* min */}
          <View style={{ alignItems: "center" }}>
            <View style={styles.timeBox}>
              <Text style={styles.countNum}>
                {minutes.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Min</Text>
          </View>

          {/* sec */}
          <View style={{ alignItems: "center" }}>
            <View style={styles.timeBox}>
              <Text style={styles.countNum}>
                {seconds.toString().padStart(2, "0")}
              </Text>
            </View>
            <Text>Sec</Text>
          </View>
        </View>

        {/* bus stations */}
        <View style={styles.butStationContainer}>
          {/* left */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={greenMarker} />
            <View>
              <Text style={styles.busStationPrimary}>Pickup Bus stop</Text>
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
            <Image source={arrowRight} style={{ height: 10, marginLeft: -5 }} />
          </View>

          {/* right */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={redMarker} />
            <View>
              <Text style={styles.busStationPrimary}>Dropoff Bus stop</Text>
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
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Departure time
            </Text>
            <Text style={styles.boldText}>8:30 AM</Text>
          </View>

          {/* route */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Route
            </Text>
            <Text style={styles.boldText}>Surelere Staudium Way</Text>
          </View>
        </View>

        {/* passenger list */}
        <View style={{ flex: 1, gap: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 24.05 }}>
            Picking Up Rideer
          </Text>
          <FlatList
            style={{
              borderRadius: 12,
              paddingBottom: 10,
            }}
            data={list}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setActiveItem(index);
                  onShowDetailsModal(true);
                }}
                style={[
                  styles.passengerItem,
                  {
                    backgroundColor: activeItem === index ? "#E3F3FF" : "white",
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
                  <Text style={styles.boldText}>{item.bookingNumber}</Text>
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
                  <Text style={styles.boldText}>{item.pickupPoint}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default OnGoingTripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: -10,
    justifyContent: "space-between",
    padding: 10,
  },

  heading: {
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 36,
    color: "#04262F",
    textAlign: "center",
  },

  timeBox: {
    borderWidth: 0.5,
    height: 48,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  countNum: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 22,
  },

  butStationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },

  semiboldText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25.6,
    color: "#04262F",
    opacity: 0.6,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24.05,
    color: "#1E0000",
  },

  busStationPrimary: {
    fontSize: 12,
    color: "#1E0000",
    opacity: 0.4,
    lineHeight: 18.04,
  },

  passengerItem: {
    borderWidth: 0.5,
    padding: 10,
    borderColor: "#1E000033",
    borderRadius: 12,
    gap: 10,
    marginBottom: 20,
  },

  button: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24.05,
  },
});
