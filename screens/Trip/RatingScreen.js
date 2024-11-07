import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Rating from "../../components/Trip/Rating";

export default function RatingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <Rating />
    </SafeAreaView>
  );
}
