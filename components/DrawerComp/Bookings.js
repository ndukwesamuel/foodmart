import { Text, View, StyleSheet, Pressable, Image } from "react-native";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const greenMarker = require("../../assets/greenmarker.png");
const redMarker = require("../../assets/redmarker.png");
const line = require("../../assets/arrow-line.png");
const arrowRight = require("../../assets/arrow-left.png");
const profile = require("../../assets/profile-1.png");
import { useNavigation } from "@react-navigation/native";

export default function Bookings() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={arrowBack} />
        </Pressable>
        <Pressable>
          <Image source={menuBtn} />
        </Pressable>
      </View>

      {/* heading */}
      <Text style={styles.heading}>Bookings</Text>

      {/* bus stations */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
          borderBottomWidth: 1,
          borderColor: "#0004262F",
          paddingVertical: 10,
        }}
      >
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
          <Image source={line} style={{ flex: 1 }} />
          <Image source={arrowRight} style={{ height: 10, marginLeft: -5 }} />
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
            <Text style={styles.busStationPrimary}>Dropoff Bus stop</Text>
            <Text style={{ lineHeight: 21.04 }}>Lekki Phase 1...</Text>
          </View>
        </View>
      </View>

      <View style={{ gap: 10 }}>
        {/* plate number */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{ height: 25.85, width: 22.43, borderRadius: 50 }}
              source={profile}
            />
            <Text style={{ fontSize: 16, lineHeight: 25.6, color: "#04262F" }}>
              Bus Plate Number
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              lineHeight: 25.6,
              color: "#04262F",
            }}
          >
            ABC- 123DE
          </Text>
        </View>

        {/* trip fare */}
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.tripFare}>Trip Fare</Text>
          <Text style={styles.tripFare}>₦800</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 20,
    padding: 10,
  },

  heading: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1E0000",
  },

  busStationPrimary: {
    fontSize: 12,
    color: "#1E0000",
    opacity: 0.4,
    lineHeight: 18.04,
  },

  tripFare: {
    fontSize: 16,
    color: "#04262F",
    lineHeight: 25.6,
  },
});
