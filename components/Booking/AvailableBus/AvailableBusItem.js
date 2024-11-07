import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import ModalContainer from "../BookATrip/ModalContainer";
import { useNavigation } from "@react-navigation/native";
const profile1 = require("../../../assets/profile-1.png");
const profile2 = require("../../../assets/profile-2.png");
const profile3 = require("../../../assets/profile-3.png");
const profile4 = require("../../../assets/profile-4.png");

const AvailableBusItem = ({ onHideModal, data }) => {
  const navigation = useNavigation();

  const availableSeatsCount = data?.seats?.reduce((count, seat) => {
    if (seat.available) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <ModalContainer>
      <Pressable
        onPress={() => onHideModal()}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          zIndex: 0.7,
        }}
      >
        <View style={styles.itemContainer}>
          <Pressable onPress={() => console.log("pressed")}>
            <View style={styles.item}>
              {/* item top left */}
              <View style={{ justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image
                    style={{ width: 24, height: 24, borderRadius: 50 }}
                    source={profile1}
                  />
                  <Text style={{ lineHeight: 21.04 }}>
                    {data?.busId?.plateNumber}
                  </Text>
                </View>
                <View style={{ paddingLeft: 35 }}>
                  <Text style={{ lineHeight: 21.04, color: "#1E0000" }}>
                    {/* Oshodi- Island */}
                    {`${data?.pickUp}-${data?.dropOff}`}
                  </Text>
                </View>
              </View>

              {/* item top right */}
              <View>
                <View style={{ gap: 15 }}>
                  <View>
                    <Text> ₦{data?.price}</Text>
                  </View>
                  <View>
                    <Text>Departure - {data?.departureTime}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* available seats and profile images */}
            <View
              style={{
                padding: 10,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#E1E1FF",
                    padding: 5,
                    borderWidth: 0.4,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>
                    {availableSeatsCount} seats available
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 18.99, height: 18.99 }}
                    source={profile2}
                  />
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
                  <Text style={{ fontSize: 12, lineHeight: 18.04 }}>+5</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                padding: 10,
                paddingBottom: 20,
                alignItems: "flex-start",
              }}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("Selected-Route", { data: data });
                  onHideModal(false);
                }}
                style={styles.button}
              >
                <Text style={{ color: "white" }}>Join Trip</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </ModalContainer>
  );
};

export default AvailableBusItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#F3F3FF",
    width: "90%",
    borderRadius: 10,
    gap: 10,
  },

  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#001272",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 10,
  },
});
