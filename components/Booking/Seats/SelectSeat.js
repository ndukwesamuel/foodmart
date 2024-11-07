import { View, Text, Image, Pressable, StyleSheet } from "react-native";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
const wheel = require("../../../assets/wheel.png");
const check = require("../../../assets/check.png");
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Get_Single_Routes_Fun,
  UserBookSeats_fun,
} from "../../../Redux/Rider/RouteSlice";
const SelectSeat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute()?.params?.data;
  // const { _id } = route.params?.data;

  const [refreshing, setRefreshing] = useState(false);

  const { get_single_route_data, get_single_route_isLoading } = useSelector(
    (state) => state?.RouteSlice
  );

  console.log({
    yyy: route?.route,
  });

  console.log({
    ee: get_single_route_data?.route?.seats,
  });

  const availableSeatsCount =
    get_single_route_data?.route?.seats?.filter((seat) => seat.available)
      ?.length || 0;

  const onRefresh = () => {
    setRefreshing(true);

    // Perform your refresh action here, e.g., fetching new data

    setTimeout(() => {
      dispatch(Get_Single_Routes_Fun(route?.route?._id)); //

      setRefreshing(false);
    }, 2000); // Simulating a delay, replace with actual refresh logic
  };

  useEffect(() => {
    dispatch(Get_Single_Routes_Fun(route?.route?._id)); //

    return () => {};
  }, [dispatch]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const onBookSeat = () => {
    dispatch(
      UserBookSeats_fun({
        selectedSeats,
        get_single_route_data,
      })
    );

    navigation.navigate("Route-Info");
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        {/* menu and back button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={arrowBack} />
          </Pressable>
          {/* <Pressable>
            <Image source={menuBtn} />
          </Pressable> */}
        </View>

        {/* heading */}
        <View>
          <Text
            style={{
              fontSize: 24,
              lineHeight: 36,
              fontWeight: "900",
              color: "#1E0000",
            }}
          >
            Select a Seat
          </Text>
          <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
            {availableSeatsCount} seats available
          </Text>
        </View>
      </View>
      {/* Seats */}

      {/* this is seet part */}
      <View
        style={{
          height: "65%",
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "#23488833",
          padding: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: 44,
          rowGap: 20,
        }}
      >
        {get_single_route_data?.route?.seats?.map((item, index) => {
          if (index === 0) {
            return (
              <Image
                key={index}
                style={{ width: 70, height: 70 }}
                source={wheel}
              />
            );
          } else {
            return (
              <Pressable
                onPress={() => {
                  if (item?.available === false) {
                    console.log(`seat ${item?.seatNumber} is taken`);
                  } else {
                    console.log(item?.seatNumber);
                    toggleSeatSelection(item?.seatNumber);
                  }
                }}
                key={index}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#23488833",
                  opacity: item?.available === false ? 0.2 : 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: selectedSeats.includes(item?.seatNumber)
                    ? "#234888"
                    : "white",
                }}
              >
                {selectedSeats.includes(item?.seatNumber) ? (
                  <Image source={check} />
                ) : (
                  <Text
                    style={{
                      color: "#234888",
                      fontSize: 16,
                      lineHeight: 24.05,
                    }}
                  >
                    {item?.seatNumber}
                  </Text>
                )}
              </Pressable>
            );
          }
        })}
      </View>

      {selectedSeats?.length === 0 ? (
        <>
          <Pressable
            // onPress={onBookSeat}
            // onPress={() => navigation.navigate("Route-Info")}

            style={{
              backgroundColor: "#001272",
              padding: 10,
              borderRadius: 8,
              marginTop: 30,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "700",
                lineHeight: 24.05,
              }}
            >
              Continue
            </Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            onPress={onBookSeat}
            // onPress={() => navigation.navigate("Route-Info")}
            style={{
              backgroundColor: "#001272",
              padding: 10,
              borderRadius: 8,
              marginTop: 30,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "700",
                lineHeight: 24.05,
              }}
            >
              {/* Continue */}
              Select Seat
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default SelectSeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    padding: 20,
    gap: 20,
  },
});
