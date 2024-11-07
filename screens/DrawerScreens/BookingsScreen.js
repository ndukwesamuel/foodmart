import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Bookings from "../../components/DrawerComp/Bookings";

export default function BookingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Bookings />
    </SafeAreaView>
  );
}
