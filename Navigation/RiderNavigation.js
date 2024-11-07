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

const Stack = createNativeStackNavigator();

const RiderNavigation = () => {
  const screenOptions = {
    headerShown: false, // This hides the header for all screens by default
  };
  return (
    // <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Book-A-Trip" component={BookATripScreen} />
      <Stack.Screen name="Available-Bus" component={AvailabeBusScreen} />
      <Stack.Screen name="Selected-Route" component={SelectedRouteScreen} />
      <Stack.Screen name="Select-Seat" component={SelectSeatScreen} />
      <Stack.Screen name="Route-Info" component={RouteInfoScreen} />
      <Stack.Screen name="Payment-Type" component={PaymentTypeScreen} />
      <Stack.Screen name="Card-Payment" component={PayWithCardScreen} />
      <Stack.Screen name="Transfer-Payment" component={PayWithTransferScreen} />
      {/* <Stack.Screen name="ongoing-trip" component={OngoingTripScreen} /> */}
      <Stack.Screen name="Arriving" component={ArrivingScreen} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
      <Stack.Screen name="Bookings" component={BookingsScreen} />
    </Stack.Navigator>
  );
};

export default RiderNavigation;
