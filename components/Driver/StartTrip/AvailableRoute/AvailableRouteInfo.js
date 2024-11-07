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
import { useState } from "react";

const AvailableRouteInfo = () => {
  const navigation = useNavigation();
  const [route, setRoute] = useState(0);

  const list = [
    { name: "Surelere Mafoluku Way" },
    { name: "Surelere Stadium Way" },
    { name: "3rd Mainland Bridge Mafoluku Way" },
    { name: "Surelere Mafoluku Way" },
  ];

  return (
    <View style={styles.container}>
      {/* container details */}
      <View style={{ gap: 10 }}>
        <Text style={styles.heading}>Available Route</Text>
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

        {/* list items */}
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => setRoute(index)}
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 0.5,
                borderColor: "#0000004D",
              }}
            >
              <View
                style={{
                  width: 16.75,
                  height: 16.75,
                  borderColor: "#001EC5",
                  borderWidth: 0.5,
                  borderRadius: 50,
                  backgroundColor: route === index ? "#001EC5" : "white",
                }}
              ></View>
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* buttons */}
      <View style={{ gap: 5, padding: 10 }}>
        <Pressable
          onPress={() => navigation.navigate("Driver-Trip-Details")}
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
      </View>
    </View>
  );
};

export default AvailableRouteInfo;

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
