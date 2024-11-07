import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { formatDate } from "../../../utills/DateTime";
const profile1 = require("../../../assets/profile-1.png");
const profile2 = require("../../../assets/profile-2.png");
const profile3 = require("../../../assets/profile-3.png");
const profile4 = require("../../../assets/profile-4.png");
const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/markerline.png");

const AvailableBusItems = ({ onShowModal, data }) => {
  return (
    <Pressable onPress={() => onShowModal(true)} style={styles.listItems}>
      <View
        style={{
          padding: 10,
          borderBottomWidth: 0.5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* item top left */}
        <View style={{ gap: 30, justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Image source={profile1} />
            <Text style={{ lineHeight: 21.04 }}>
              {data?.busId?.plateNumber}
            </Text>
          </View>
          <View style={{ paddingLeft: 35 }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18.04,
                opacity: 0.4,
                color: "#1E0000",
              }}
            >
              Departure time
            </Text>
            <Text style={{ lineHeight: 21.04, color: "#1E0000" }}>
              {data?.departureTime}
            </Text>
          </View>

          <View style={{ paddingLeft: 35 }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 18.04,
                opacity: 0.4,
                color: "#1E0000",
              }}
            >
              Departure day
            </Text>
            <Text style={{ lineHeight: 21.04, color: "#1E0000" }}>
              {/* {data?.departureDate} */}
              {formatDate(data?.departureDate)}
            </Text>
          </View>

          <Text>Status {data?.status}</Text>
        </View>

        {/* item top right */}
        <View style={{ flexDirection: "row", gap: 5 }}>
          <View style={{ alignItems: "center" }}>
            <Image source={greenMarker} />
            <Image source={line} />
            <Image source={redMarker} />
          </View>
          <View style={{ gap: 25 }}>
            <View>
              <Text style={{ fontSize: 12 }}>Pickup Bus stop</Text>
              <Text>{data?.pickUp}</Text>
            </View>
            <View>
              <Text>Dropoff Bus stop</Text>
              <Text>{data?.dropOff}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 18.99, height: 18.99 }} source={profile2} />
            <Image
              style={{ width: 18.99, height: 18.99, marginLeft: -8 }}
              source={profile3}
            />
            <Image
              style={{ width: 18.99, height: 18.99, marginLeft: -8 }}
              source={profile4}
            />
          </View>
          <View style={{ borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 12, lineHeight: 18.04 }}>
              +{data?.passengers?.length}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#F3F3FF",
              padding: 5,
              borderWidth: 0.4,
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: 12 }}>{data?.seats?.length} seats</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, lineHeight: 25.6, fontWeight: "500" }}>
            ₦{data?.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default AvailableBusItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  listItems: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
});
