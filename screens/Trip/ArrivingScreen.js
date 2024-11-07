import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import OngoingTrip from "../../components/Trip/OngoingTrip";
import Arriving from "../../components/Trip/Arriving";

export default function ArrivingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <Arriving />
    </SafeAreaView>
  );
}
