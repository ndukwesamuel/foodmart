import * as React from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import RiderNavigation from "./RiderNavigation";
import { reset_isOnboarding } from "../Redux/OnboardingSlice";
import { BookATripSlice_reset } from "../Redux/BookATripSlice";
import { reset_login } from "../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import TripNavigation from "./TripNavigation";
import ProfileScreen from "../screens/DrawerScreens/ProfileScreen";
import TransactionScreen from "../screens/DrawerScreens/TransactionScreen";
// import Profile from "../components/DrawerComp/Profile";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 100, right: 50 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 50, left: 20 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(reset_isOnboarding());
    dispatch(reset_login());
    dispatch(BookATripSlice_reset());
    // Implement your logout logic here
    // For example, you can clear user session and navigate to the login screen
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

export default function RideDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home_screen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{ drawerLabel: " Home" }}
        name="Home_screen"
        component={RiderNavigation}
      />
      <Drawer.Screen
        name="tripscreen"
        options={{ drawerLabel: " Trip" }}
        component={TripNavigation}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Transaction" component={TransactionScreen} />
    </Drawer.Navigator>
  );
}
