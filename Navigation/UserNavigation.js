import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/UserScreens/Home";
import DeliveryMap from "../screens/UserScreens/DeliveryMap";
import RatingPage from "../screens/UserScreens/RatingPage";
import FoodDetails from "../screens/UserScreens/FoodDetails";
import GetEverythingPage from "../screens/UserScreens/GetEverythingPage";
import DeliveredOrders from "../screens/Orders/DeliveredOrders";
import MyOrder from "../screens/Orders/MyOrder";
import MyFavorite from "../screens/Orders/MyFavorite";
import FAQs from "../screens/FAQs";
import FirstRewardScreen from "../screens/Reward/RewardSreen1";
import SecondRewardScreen from "../screens/Reward/RewardScreen2";
import HomeScreen from "../screens/HomeScreen";
import MainHomescreen from "../screens/UserScreens/MainHomescreen";
import RestaurantMenuScreen from "../screens/UserScreens/RestaurantMenuScreen";
import CheckoutPage from "../screens/UserScreens/CheckoutPage";
import SupportMainPage from "../screens/Support/supportMainPage";
import ReportIssuePage from "../screens/Support/reportIssuePage";
import ChatPage from "../screens/Support/chatPage";
// import DeliveredOrders from "../screens/Orders/DeliveredOrders";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MainHomescreen" component={MainHomescreen} />
      <Stack.Screen
        name="RestaurantMenuScreen"
        component={RestaurantMenuScreen}
      />

      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
      <Stack.Screen name="RatingPage" component={RatingPage} />
      <Stack.Screen name="GetEverything" component={GetEverythingPage} />
      <Stack.Screen name="CheckoutPage" component={CheckoutPage} />
      {/* this group of screen is for order  start  dont remove it */}
      <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
      <Stack.Screen name="MyFavorite" component={MyFavorite} />
      <Stack.Screen name="MyOrder" component={MyOrder} />
      <Stack.Screen name="FirstRewardPage" component={FirstRewardScreen}/>
      <Stack.Screen name="SecondRewardPage" component={SecondRewardScreen}/>
      <Stack.Screen name="Support" component={SupportMainPage}/>
      <Stack.Screen name="ReportIssue" component={ReportIssuePage}/>
      <Stack.Screen name="Chat" component={ChatPage}/>

      {/* the order screen end here */}

      <Stack.Screen name="FAQs" component={FAQs} />
    </Stack.Navigator>
  );
}
