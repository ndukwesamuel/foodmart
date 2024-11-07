import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from "react-native";
const greenMarker = require("../../../../assets/greenmarker.png");
const redMarker = require("../../../../assets/redmarker.png");
const line = require("../../../../assets/arrow-line.png");
const arrowRight = require("../../../../assets/arrow-left.png");
import { useNavigation } from "@react-navigation/native";
import { ChangeRouteFun } from "../../../shared/Changeroute";

const TripDetailsInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* container details */}
      <View style={{ gap: 10 }}>
        <Text style={styles.heading}>Trip Detail</Text>
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
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
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
      </View>

      {/* buttons */}
      <View style={{ gap: 5, padding: 10 }}>
        <Pressable
          onPress={() => navigation.navigate("Driver-Begin-Trip")}
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
        <Pressable
          onPress={() => ChangeRouteFun(dispatch, navigation)}
          style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}
        >
          <Text
            style={{
              color: "#001272",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 24.05,
            }}
          >
            Change Route
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TripDetailsInfo;

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
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 36,
    color: "#04262F",
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

  busStationPrimary: {
    fontSize: 12,
    color: "#1E0000",
    opacity: 0.4,
    lineHeight: 18.04,
  },
});
