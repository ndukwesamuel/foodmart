import { View, Text, Image } from "react-native";
import React from "react";

const AriveDestination = () => {
  return (
    <View
      style={{
        // justifyContent: "center",

        flex: 1,
        // backgroundColor: "#25292e",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={require("../../assets/tick-circle.png")} />

      <Text
        style={{
          fontSize: 16,
          fontWeight: "900",
          lineHeight: 36,
          color: "#04262F",
          textAlign: "center",
        }}
      >
        Driver Has Arrived Your Destination
      </Text>
      <Text>You have gotten to your destination</Text>
    </View>
  );
};

export default AriveDestination;
