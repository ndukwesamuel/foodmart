import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/UserScreens/Home";
import DeliveryMap from "../screens/UserScreens/DeliveryMap";
import RatingPage from "../screens/UserScreens/RatingPage";
import FoodDetails from "../screens/UserScreens/FoodDetails";
import GetEverythingPage from "../screens/UserScreens/GetEverythingPage";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="FoodDetails"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
      <Stack.Screen name="RatingPage" component={RatingPage} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="GetEverything" component={GetEverythingPage}/>
    </Stack.Navigator>
  );
}
