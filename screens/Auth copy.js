import { View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContainer from "../components/Auth/AuthContainer";

const Auth = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <AuthContainer />
    </SafeAreaView>
  );
};

export default Auth;
