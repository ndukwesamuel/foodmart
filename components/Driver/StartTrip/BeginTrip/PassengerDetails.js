import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Modal from "../../../Modal";
const cancelBtn = require("../../../../assets/close-circle.png");

export default function PassengerDetails({ onHideModal, data }) {
  return (
    <Modal>
      <View
        style={{
          gap: 10,
          backgroundColor: "white",
          width: "90%",
          padding: 10,
          borderRadius: 12,
        }}
      >
        <Pressable onPress={() => onHideModal(false)}>
          <Image
            style={{ alignSelf: "flex-end", height: 24, width: 24 }}
            source={cancelBtn}
          />
        </Pressable>
        <Text style={{ fontSize: 16, fontWeight: "500", lineHeight: 24.05 }}>
          {`${data?.passenger?.userName}   ${data?.passenger?.lastName}`}
        </Text>

        {/* name */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, lineHeight: 24.05 }}>Booking Code</Text>
          <Text style={{ fontWeight: "500", lineHeight: 24.05, fontSize: 16 }}>
            {data?.code}
          </Text>
        </View>

        {/* destination */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, lineHeight: 24.05 }}>Destination</Text>
          <Text style={{ fontWeight: "500", lineHeight: 24.05, fontSize: 16 }}>
            {data?.destination}
          </Text>
        </View>

        {/* sit number */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, lineHeight: 24.05 }}>Sitting No.</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              // width: "30%",
              justifyContent: "flex-end",
            }}
          >
            {data?.seatNumber?.map((seat) => {
              return (
                <Text
                  style={{ fontWeight: "500", lineHeight: 24.05, fontSize: 16 }}
                >
                  {`${seat},`}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 12,
  },
});
