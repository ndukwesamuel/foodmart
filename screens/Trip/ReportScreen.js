import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Rating from "../../components/Trip/Rating";
import Report from "../../components/Trip/Report";

export default function ReportScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="#001272" barStyle="light-content" /> */}
      <Report />
    </SafeAreaView>
  );
}
