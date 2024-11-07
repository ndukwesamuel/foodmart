import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const redArrow = require("../../assets/red-arrow.png");
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Get_all_Trip_Fun } from "../../Redux/Rider/TripSLice";
import { useEffect } from "react";

export default function Transactions({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_all_Trip_Fun());

    return () => {};
  }, []);

  const { Get_All_trip_data } = useSelector((state) => state?.TripSLice);

  console.log({
    rr: Get_All_trip_data?.trips[0],
  });

  return (
    <View style={styles.container}>
      {/* heading */}
      <Text style={styles.heading}>Recent Transactions</Text>

      <View style={{ gap: 10 }}>
        {/* TOP BORDER */}

        <FlatList
          data={Get_All_trip_data?.trips}
          ListHeaderComponent={
            <View style={{ paddingBottom: 10 }}>
              <View style={styles.lines}></View>
            </View>
          }
          ListFooterComponent={
            <View style={{ gap: 5, paddingTop: 10 }}>
              <View style={styles.lines}></View>
              <View style={styles.lines}></View>
            </View>
          }
          renderItem={({ item, index }) => (
            <Pressable
              // onPress={() => navigation.navigate("Bookings")}
              style={styles.itemContainer}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View style={styles.arrowContainer}>
                  <Image source={redArrow} />
                </View>

                <View>
                  <Text style={{ fontWeight: "500", lineHeight: 18.9 }}>
                    Trip payment
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: "#37565E", lineHeight: 19.2 }}
                  >
                    Today, 10:23pm
                  </Text>
                </View>
              </View>
              <Text>₦ {item?.seatNumber?.length * item?.routeId?.price}</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 20,
    padding: 10,
  },

  heading: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1E0000",
    paddingHorizontal: 10,
  },

  itemContainer: {
    padding: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  arrowContainer: {
    backgroundColor: "#DF0E000D",
    height: 37.27,
    width: 37.27,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  lines: {
    width: "80%",
    height: 1,
    backgroundColor: "#04262F",
    alignSelf: "flex-end",
    opacity: 0.2,
  },
});
