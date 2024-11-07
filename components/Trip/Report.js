import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
import { useNavigation } from "@react-navigation/native";

const Report = () => {
  const navigation = useNavigation();

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

        {/* heading */}
        <Text style={styles.heading}>Report</Text>

        {/* card details */}
        <View style={{ gap: 20 }}>
          {/* card number */}
          <View style={{ gap: 10 }}>
            <Text style={{ lineHeight: 18.9, fontWeight: "500" }}>
              Bus Plate Number
            </Text>
            <TextInput style={styles.input} />
          </View>

          {/* Expiring Date */}
          <View style={{ gap: 10 }}>
            <Text style={{ lineHeight: 18.9, fontWeight: "500" }}>Comment</Text>
            <TextInput
              style={[styles.input, { height: "60%" }]}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>

      <Pressable
        style={{
          backgroundColor: "#001272",
          padding: 10,
          borderRadius: 8,
          elevation: 5,
        }}
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
          Report
        </Text>
      </Pressable>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 80,
    gap: 20,
  },

  heading: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1E0000",
  },

  input: {
    borderWidth: 0.5,
    padding: 8,
    borderColor: "#0000004D",
    borderRadius: 8,
  },
});
