import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
const profile = require("../../../assets/profile-2.png");

const PassengersList = ({ data }) => {
  console.log({
    ss: data,
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "#030E4A", fontWeight: "700", lineHeight: 16.87 }}>
        Co-Passengers
      </Text>
      <View style={styles.listContainer}>
        {data?.map((item) => (
          <Pressable key={item._id} style={styles.listItems}>
            {console.log({
              qqq: item,
            })}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                style={{ height: 28, width: 28, borderRadius: 50 }}
                source={profile}
              />
              <Text style={{ color: "#030E4A", lineHeight: 24, fontSize: 16 }}>
                {`${item?.passenger?.userName} ${item?.passenger?.lastName}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              {item?.seatNumber?.map((number) => (
                <Text key={number} style={{ color: "#030E4A", lineHeight: 21 }}>
                  Seat {number}
                </Text>
              ))}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default PassengersList;

const styles = StyleSheet.create({
  container: {
    height: "45%",
    gap: 10,
  },
  listContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: "#030E4A80",
  },
  listItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
});
