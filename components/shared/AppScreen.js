import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

const AppScreen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFEDD8" barStyle="light-content" />
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;
