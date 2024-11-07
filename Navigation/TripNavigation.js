import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookATripScreen from "../screens/Booking/BookATripScreen";
import AvailabeBusScreen from "../screens/Booking/AvailabeBusScreen";
import SelectedRouteScreen from "../screens/Booking/SelectedRouteScreen";
import SelectSeatScreen from "../screens/Booking/SelectSeatScreen";
import RouteInfoScreen from "../screens/Payment/RouteInfoScreen";
import PaymentTypeScreen from "../screens/Payment/PaymentTypeScreen";
import PayWithCardScreen from "../screens/Payment/PayWithCardScreen";
import PayWithTransferScreen from "../screens/Payment/PayWithTransferScreen";
import OngoingTripScreen from "../screens/Trip/OngoingTripScreen";
import ArrivingScreen from "../screens/Trip/ArrivingScreen";
import RatingScreen from "../screens/Trip/RatingScreen";
import ReportScreen from "../screens/Trip/ReportScreen";
import ProfileScreen from "../screens/DrawerScreens/ProfileScreen";
import NotificationScreen from "../screens/DrawerScreens/NotificationScreen";
import TransactionScreen from "../screens/DrawerScreens/TransactionScreen";
import BookingsScreen from "../screens/DrawerScreens/BookingsScreen";
import HomeScreen from "../screens/RiderScreen/HomeScreen";
import TripPage from "../screens/TripsScreen/TripPage";
import TripDetails from "../screens/TripsScreen/TripDetails";

const Stack = createNativeStackNavigator();

const TripNavigation = () => {
  const screenOptions = {
    headerShown: false, // This hides the header for all screens by default
  };
  return (
    // <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Navigator initialRouteName="Trips" screenOptions={screenOptions}>
      <Stack.Screen
        name="Trips"
        component={TripPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Tripsdetails"
        component={TripDetails}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="ongoing-trip" component={OngoingTripScreen} />
    </Stack.Navigator>
  );
};

export default TripNavigation;
