import React, { useEffect } from "react";
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import Profile from "../../components/DrawerComp/Profile";
import { UserProfile_Fun } from "../../Redux/AuthSlice";
const menuBtn = require("../../assets/menu-button.png");
import { useSelector, useDispatch } from "react-redux";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserProfile_Fun());

    return () => {};
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#E1F5FE" barStyle="dark-content" />

      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 50, right: 30, zIndex: 1 }}
      >
        <Image source={menuBtn} />
      </TouchableOpacity>
      <Profile />
    </SafeAreaView>
  );
}
