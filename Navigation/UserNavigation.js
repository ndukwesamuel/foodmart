import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/UserScreens/Home";
import DeliveryMap from "../screens/UserScreens/DeliveryMap";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="DeliveryMap"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
