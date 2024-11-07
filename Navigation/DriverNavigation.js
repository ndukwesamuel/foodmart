import { View, Text } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverHomeScreen from "../screens/DriverScreens/Home/DriverHomeScreen";
import StartATripScreen from "../screens/DriverScreens/StartTrip/StartATripScreen";
import AvailableRouteScreen from "../screens/DriverScreens/StartTrip/AvailableRouteScreen";
import TripDetailsScreen from "../screens/DriverScreens/StartTrip/TripDetailsScreen";
import BeginTripScreen from "../screens/DriverScreens/StartTrip/BeginTripScreen";
import DOnGoingTripScreen from "../screens/DriverScreens/StartTrip/DOnGoingTripScreen";
import HomeScreen from "../screens/RiderScreen/HomeScreen";
import TripPage from "../screens/DriverScreens/TripPage";
import DriverTripDetails from "../screens/DriverScreens/DriverTripDetails";
import OnGoingTrip from "../components/Driver/StartTrip/OnGoingTrip/OnGoingTrip";
import BeginTrip from "../components/Driver/StartTrip/BeginTrip/BeginTrip";
import DriverTrip from "../screens/DriverScreens/DriverTrip";

const Stack = createNativeStackNavigator();

const DriverNavigation = () => {
  const screenOptions = {
    headerShown: false, // This hides the header for all screens by default
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {/* <Stack.Navigator> */}
      <Stack.Screen
        name="DriverHome"
        component={TripPage}
        // options={{
        //   headerShown: false,
        // }}
      />

      <Stack.Screen name="drivertripdetails" component={DriverTripDetails} />

      <Stack.Screen name="Driver-Begin-Trip" component={DriverTrip} />
      {/* <Stack.Screen name="Driver-Begin-Trips" component={BeginTripScreen} /> */}

      <Stack.Screen name="Driver-Trip-Details" component={TripDetailsScreen} />
      {/* <Stack.Screen name="Driver-Ongoing-Trip" component={DOnGoingTripScreen} /> */}
    </Stack.Navigator>
  );
};

export default DriverNavigation;
