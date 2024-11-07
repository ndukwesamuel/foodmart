import { View, Text, StyleSheet, Image, Pressable } from "react-native";
const profile4 = require("../../../assets/profile-4.png");
const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/arrow-line.png");
const arrowRight = require("../../../assets/arrow-left.png");
import { useNavigation } from "@react-navigation/native";

const PaymentTypeInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* container details */}
      <View style={{ padding: 10, gap: 20 }}>
        <Text style={styles.heading}>Select Payment Type</Text>
        {/* trip fare */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.semiboldText]}>Trip fare</Text>
          <Text style={[styles.semiboldText, { opacity: 1 }]}>₦700 - ₦800</Text>
        </View>

        {/* payment type list */}
        <View style={{ gap: 10 }}>
          {/* pay with card */}
          <Pressable
            onPress={() => navigation.navigate("Card-Payment")}
            style={styles.listItem}
          >
            <Text>Pay With Card</Text>
            <View style={styles.radioBtn}></View>
          </Pressable>

          {/* Pay With Transfer */}
          <Pressable
            onPress={() => navigation.navigate("Transfer-Payment")}
            style={styles.listItem}
          >
            <Text>Pay With Transfer</Text>
            <View style={styles.radioBtn}></View>
          </Pressable>

          {/* Pay With Wallet */}
          <Pressable style={styles.listItem}>
            <Text>Pay With Wallet</Text>
            <View style={styles.radioBtn}></View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PaymentTypeInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: -10,
    justifyContent: "space-between",
  },

  heading: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 25.6,
    color: "#04262F",
  },

  semiboldText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 25.6,
    color: "#04262F",
    opacity: 0.6,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 8,
    borderColor: "#0000004D",
  },

  radioBtn: {
    width: 16.75,
    height: 16.75,
    borderColor: "#234888",
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
