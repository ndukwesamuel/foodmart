import React from "react";
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import OngoingTrip from "../../components/Trip/OngoingTrip";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
const menuBtn = require("../../assets/menu-button.png");

export default function OngoingTripScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />

      <OngoingTrip />
    </SafeAreaView>
  );
}
