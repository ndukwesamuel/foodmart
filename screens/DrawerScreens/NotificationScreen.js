import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Notification from "../../components/DrawerComp/Notification";

export default function NotificationScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Notification />
    </SafeAreaView>
  );
}
