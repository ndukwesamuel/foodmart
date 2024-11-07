import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import BeginTrip from "../../../components/Driver/StartTrip/BeginTrip/BeginTrip";
import React, { useState, useEffect } from "react";

import MapView, { Marker, Callout } from "react-native-maps";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
import { useNavigation, useRoute } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";
import StartTripMutation from "../../../utills/StartTripMutation";
import BeginTripDetails from "../../../components/Driver/StartTrip/BeginTrip/BeginTripDetails";
import PassengerDetails from "../../../components/Driver/StartTrip/BeginTrip/PassengerDetails";
import StartModal from "../../../components/Driver/StartTrip/BeginTrip/StartModal";
import PaymentMutation from "../../../utills/PaymentMutation";
import {
  Driver_trip_Fun,
  Get__Single_driver_Trip_Fun,
} from "../../../Redux/Driver/DriverTripSLice";
import AppScreen from "../../../components/shared/AppScreen";
import { formatDateString } from "../../../utills/DateTime";
const cancelBtn = require("../../../assets/close-circle.png");

const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/arrow-line.png");
const arrowRight = require("../../../assets/arrow-left.png");
const greenMarker = require("../../../assets/greenmarker.png");

const BeginTripScreen = ({ navigation }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { item } = useRoute()?.params;
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);
  const {
    get_single_driver_trip_data,
    driver_trip_data,
    driver_trip_isLoading,
  } = useSelector((state) => state?.DriverTripSLice);

  console.log({
    yooop: get_single_driver_trip_data?.route?.departureDate,
    yooop1: get_single_driver_trip_data?.route?.departureTime,
  });

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);

    dispatch(
      Get__Single_driver_Trip_Fun(get_single_driver_trip_data?.route._id)
    );

    // Wait for 2 seconds
    setRefreshing(false);
  };
  const dispatch = useDispatch();

  const toggleDetailsModal = (state) => {
    setShowDetailsModal(state);
  };

  const toggleStartModal = (state) => {
    setShowStartModal(state);
  };

  const StartTripMutation_Instance = StartTripMutation(user_data.token, item);

  const [canStartTrip, setCanStartTrip] = useState(true);
  const [availableCount, setAvailableCount] = useState(0);
  const [occupiedCount, setOccupiedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Parse departure date and time
      const departureDateTime = new Date(
        `${item?.departureDate} ${item?.departureTime}`
      );
      // Get current date and time
      const currentDate = new Date();

      // Check if the departure date/time is in the future
      if (departureDateTime > currentDate) {
        setCanStartTrip(false);
      } else {
        setCanStartTrip(true);
      }
    }, 1000);

    dispatch(Get__Single_driver_Trip_Fun(item._id));

    calculateCounts();

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [driver_trip_data]);

  const calculateCounts = () => {
    let available = 0;
    let occupied = 0;

    get_single_driver_trip_data?.route?.seats?.forEach((seat) => {
      if (seat.available) {
        available++;
      } else {
        occupied++;
      }
    });

    setAvailableCount(available);
    setOccupiedCount(occupied);
  };

  console.log({
    asas: get_single_driver_trip_data?.route?.seats,
  });

  console.log({
    yyyasas: get_single_driver_trip_data,
  });

  console.log({
    departureDate: formatDate(item?.departureDate),
    departureTime: item?.departureTime,
  });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        height: "100%",
        // borderColor: "red",
        // borderWidth: 10,
        paddingHorizontal: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* container details */}
      <View
        style={{
          flex: 1,
          height: "100%",
          paddingTop: 40,
        }}
      >
        {/* heading */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "900",
            lineHeight: 36,
            color: "#04262F",
            textAlign: "center",
          }}
        >
          Your Trip Start In
        </Text>
        <CountdownTimer
          departureDate={formatDate(item?.departureDate)}
          departureTime={item?.departureTime}
        />

        {/* bus stations */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,

            marginVertical: 10,
          }}
        >
          {/* left */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={greenMarker} />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#1E0000",
                  opacity: 0.4,
                  lineHeight: 18.04,
                }}
              >
                Pickup Bus stop
              </Text>
              <Text style={{ lineHeight: 21.04 }}>{item?.pickUp}</Text>
            </View>
          </View>

          {/* center */}
          <View
            style={{
              width: "30%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={line} style={{ width: "90%" }} />
            <Image source={arrowRight} style={{ height: 10, marginLeft: -5 }} />
          </View>

          {/* right */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={redMarker} />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#1E0000",
                  opacity: 0.4,
                  lineHeight: 18.04,
                }}
              >
                Dropoff Bus stop
              </Text>
              <Text style={{ lineHeight: 21.04 }}>{item?.dropOff}</Text>
            </View>
          </View>
        </View>

        {/* DEPARTMENT TIME */}
        <View
          style={{
            borderWidth: 0.5,
            padding: 10,
            borderColor: "#1E000033",
            borderRadius: 12,
            gap: 10,

            marginVertical: 10,
          }}
        >
          {/* Departure time */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Departure time
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
                color: "#1E0000",
              }}
            >
              {/* {item?.departureTime} */}
              {get_single_driver_trip_data?.route?.departureTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Departure Day
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
                color: "#1E0000",
              }}
            >
              {formatDate(get_single_driver_trip_data?.route?.departureDate)}
            </Text>
          </View>

          {/* route */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, lineHeight: 24.05, color: "#1E0000" }}>
              Route
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
                color: "#1E0000",
              }}
            >
              {get_single_driver_trip_data?.route?.name}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        {get_single_driver_trip_data?.route?.passengers.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text
              style={{
                lineHeight: 24.05,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              No Passengers
            </Text>
          </View>
        ) : (
          <View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 12,
                paddingBottom: 10,
                flex: 1,

                // borderWidth: 1,.
                // borderColor: "red",
              }}
            >
              <View style={{ flex: 1, padding: 10 }}>
                {/* <Text>Available Seats: {availableCount}</Text>
                  <Text>Occupied Seats: {occupiedCount}</Text> */}
                <Text
                  style={{
                    lineHeight: 24.05,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {occupiedCount} Passengers
                </Text>
              </View>

              <ScrollView
                style={{
                  flex: 1,
                }}
              >
                {get_single_driver_trip_data?.route?.passengers?.map(
                  (itemData, index) => (
                    <Pressable
                      onPress={() => {
                        setShowDetailsModal(true);
                        setShowDetailsData(itemData);
                      }}
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 10,
                        borderBottomWidth: 0.5,
                      }}
                    >
                      <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
                        {itemData?.passenger?.userName} {itemData?.pickUp}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Text style={{ fontSize: 16, lineHeight: 24.05 }}>
                          {itemData?.code}
                        </Text>
                        <Image
                          style={{ height: 20, width: 20 }}
                          source={arrowRight}
                        />
                      </View>
                    </Pressable>
                  )
                )}
              </ScrollView>
            </View>

            <Pressable
              disabled={!canStartTrip}
              onPress={
                () =>
                  dispatch(
                    Driver_trip_Fun({
                      status: "ongoing",
                      id: item?._id,
                    })
                  )
                // StartTripMutation_Instance.mutate({
                //   status: "ongoing",
                //   id: item?._id,
                // })
              }
              // onPress={() => navigation.navigate("Driver-Ongoing-Trip")}

              style={{
                backgroundColor: canStartTrip ? "#001272" : "#cccccc",
                padding: 10,
                borderRadius: 8,
                // margin: 20,
                marginVertical: 20,
              }}
            >
              {driver_trip_isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    color: canStartTrip ? "white" : "black",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "700",
                    lineHeight: 24.05,
                  }}
                >
                  {canStartTrip ? "Start Trip" : "Trip cannot be started yet"}
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </View>
      {/* modals */}
      {showDetailsModal && (
        <PassengerDetails
          onHideModal={toggleDetailsModal}
          data={showDetailsData}
        />
      )}
      {showStartModal && <StartModal onHideModal={toggleStartModal} />}
    </ScrollView>
  );
};

export default BeginTripScreen;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "20%",
  },

  topBtns: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topBtn: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
  },
});

// const CountdownTimer = ({ departureDate, departureTime }) => {
//   const [remainingTime, setRemainingTime] = useState("");

//   console.log({
//     ew: departureDate,
//   });
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Parse departure date and time
//       const departureDateTime = new Date(`${departureDate} ${departureTime}`);
//       // Get current date and time
//       const currentDate = new Date();
//       // Calculate the difference in milliseconds
//       const difference = departureDateTime - currentDate;

//       // Check if the departure date/time is in the future
//       if (difference > 0) {
//         // Calculate remaining hours, minutes, and seconds
//         const hours = Math.floor(difference / (1000 * 60 * 60));
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         // Update the state with the remaining time
//         setRemainingTime({ hours, minutes, seconds });
//       } else {
//         // If the departure date/time has passed, display a message
//         setRemainingTime(null);
//         // Clear the interval to stop updating the timer
//         clearInterval(interval);
//       }
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   // Inside the CountdownTimer component

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {remainingTime && (
//         <>
//           <TimeBox label="Hours" value={remainingTime.hours} />
//           <TimeBox label="Min" value={remainingTime.minutes} />
//           <TimeBox label="Sec" value={remainingTime.seconds} />
//         </>
//       )}
//       {!remainingTime && (
//         <Text style={{ color: "red", fontSize: 16, fontWeight: "900" }}>
//           Start Trip
//         </Text>
//       )}
//     </View>
//   );
// };

// const CountdownTimer = ({ departureDate, departureTime }) => {
//   const [remainingTime, setRemainingTime] = useState("");

//   console.log({
//     ew: departureDate,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Parse departure date and time
//       const departureDateTime = new Date(`${departureDate} ${departureTime}`);
//       // Get current date and time
//       const currentDate = new Date();
//       // Calculate the difference in milliseconds
//       const difference = departureDateTime - currentDate;

//       // Check if the departure date/time is in the future
//       if (difference > 0) {
//         // Calculate remaining hours, minutes, and seconds
//         const hours = Math.floor(difference / (1000 * 60 * 60));
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         // Update the state with the remaining time
//         setRemainingTime({ hours, minutes, seconds });
//       } else {
//         // If the departure date/time has passed, display a message
//         setRemainingTime(null);
//         // Clear the interval to stop updating the timer
//         clearInterval(interval);
//       }
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   // Inside the CountdownTimer component
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {remainingTime && (
//         <>
//           <TimeBox label="Hours" value={remainingTime.hours} />
//           <TimeBox label="Min" value={remainingTime.minutes} />
//           <TimeBox label="Sec" value={remainingTime.seconds} />
//         </>
//       )}
//       {!remainingTime && (
//         <Text style={{ color: "red", fontSize: 16, fontWeight: "900" }}>
//           You are late by
//         </Text>
//       )}
//     </View>
//   );
// };

// const TimeBox = ({ label, value }) => {
//   return (
//     <View>
//       <View
//         style={{
//           alignItems: "center",
//           marginHorizontal: 5,
//           padding: 10,
//           borderWidth: 1,
//           borderRadius: 8,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: "bold",
//           }}
//         >
//           {value}
//         </Text>
//       </View>
//       <Text
//         style={{
//           fontSize: 12,
//           textAlign: "center",
//         }}
//       >
//         {label}
//       </Text>
//     </View>
//   );
// };

// const CountdownTimer = ({ departureDate, departureTime }) => {
//   const [remainingTime, setRemainingTime] = useState("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Parse departure date and time
//       const departureDateTime = new Date(`${departureDate} ${departureTime}`);
//       // Get current date and time
//       const currentDate = new Date();
//       // Calculate the difference in milliseconds
//       const difference = departureDateTime - currentDate;

//       // Check if the departure date/time is in the future
//       if (difference > 0) {
//         // Calculate remaining hours, minutes, and seconds
//         const hours = Math.floor(difference / (1000 * 60 * 60));
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         // Update the state with the remaining time
//         setRemainingTime({ hours, minutes, seconds });
//       } else {
//         // If the departure date/time has passed, display a message
//         setRemainingTime(null);
//         // Clear the interval to stop updating the timer
//         clearInterval(interval);
//       }
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   // Inside the CountdownTimer component
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {remainingTime && (
//         <>
//           <TimeBox label="Hours" value={remainingTime.hours} />
//           <TimeBox label="Min" value={remainingTime.minutes} />
//           <TimeBox label="Sec" value={remainingTime.seconds} />
//         </>
//       )}
//       {!remainingTime && (
//         <Text style={{ color: "red", fontSize: 16, fontWeight: "900" }}>
//           You are late by
//         </Text>
//       )}
//     </View>
//   );
// };

// const TimeBox = ({ label, value }) => {
//   return (
//     <View style={{ alignItems: "center", marginHorizontal: 5 }}>
//       <Text
//         style={{
//           fontSize: 18,
//           fontWeight: "bold",
//         }}
//       >
//         {value < 10 ? `0${value}` : value}
//       </Text>
//       <Text style={{ fontSize: 12 }}>{label}</Text>
//     </View>
//   );
// };

// const CountdownTimer = ({ departureDate, departureTime }) => {
//   const [remainingTime, setRemainingTime] = useState("");
//   const [isLate, setIsLate] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Parse departure date and time
//       const departureDateTime = new Date(`${departureDate} ${departureTime}`);
//       // Get current date and time
//       const currentDate = new Date();
//       // Calculate the difference in milliseconds
//       const difference = departureDateTime - currentDate;

//       if (difference > 0) {
//         // If the departure date/time is in the future, calculate remaining time
//         setIsLate(false);
//         const hours = Math.floor(difference / (1000 * 60 * 60));
//         const minutes = Math.floor(
//           (difference % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);
//         setRemainingTime({ hours, minutes, seconds });
//       } else {
//         // If the departure date/time has passed, calculate elapsed time
//         setIsLate(true);
//         const elapsedMilliseconds = Math.abs(difference);
//         const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
//         const elapsedMinutes = Math.floor(
//           (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
//         );
//         const elapsedSeconds = Math.floor(
//           (elapsedMilliseconds % (1000 * 60)) / 1000
//         );
//         setRemainingTime({
//           hours: elapsedHours,
//           minutes: elapsedMinutes,
//           seconds: elapsedSeconds,
//         });
//       }
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {remainingTime && !isLate && (
//         <>
//           <TimeBox label="Hours" value={remainingTime.hours} />
//           <TimeBox label="Min" value={remainingTime.minutes} />
//           <TimeBox label="Sec" value={remainingTime.seconds} />
//         </>
//       )}
//       {isLate && (
//         <>
//           <Text style={{ color: "red", fontSize: 16, fontWeight: "900" }}>
//             You are late by
//           </Text>
//           <TimeBox label="Hours" value={remainingTime.hours} />
//           <TimeBox label="Min" value={remainingTime.minutes} />
//           <TimeBox label="Sec" value={remainingTime.seconds} />
//         </>
//       )}
//     </View>
//   );
// };

// const TimeBox = ({ label, value }) => {
//   return (
//     <View style={{ alignItems: "center", marginHorizontal: 5 }}>
//       <Text
//         style={{
//           fontSize: 18,
//           fontWeight: "bold",
//         }}
//       >
//         {value < 10 ? `0${value}` : value}
//       </Text>
//       <Text style={{ fontSize: 12 }}>{label}</Text>
//     </View>
//   );
// };

const CountdownTimer = ({ departureDate, departureTime }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [isLate, setIsLate] = useState(false);
  const [lateHours, setLateHours] = useState(0);
  const [lateMinutes, setLateMinutes] = useState(0);
  const [lateSeconds, setLateSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Parse departure date and time
      const departureDateTime = new Date(`${departureDate} ${departureTime}`);
      // Get current date and time
      const currentDate = new Date();
      // Calculate the difference in milliseconds
      const difference = departureDateTime - currentDate;

      if (difference > 0) {
        // If the departure date/time is in the future, calculate remaining time
        setIsLate(false);
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setRemainingTime({ hours, minutes, seconds });
      } else {
        // If the departure date/time has passed, calculate elapsed time
        setIsLate(true);
        const elapsedMilliseconds = Math.abs(difference);
        const elapsedHours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60));
        const elapsedMinutes = Math.floor(
          (elapsedMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
        );
        const elapsedSeconds = Math.floor(
          (elapsedMilliseconds % (1000 * 60)) / 1000
        );
        setLateHours(elapsedHours);
        setLateMinutes(elapsedMinutes);
        setLateSeconds(elapsedSeconds);
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {remainingTime && !isLate && (
        <>
          <TimeBox label="Hours" value={remainingTime.hours} />
          <TimeBox label="Min" value={remainingTime.minutes} />
          <TimeBox label="Sec" value={remainingTime.seconds} />
        </>
      )}
      {isLate && (
        <>
          <Text style={{ color: "red", fontSize: 16, fontWeight: "900" }}>
            You are late
          </Text>

          {/* <LateFuction
            trip={{
              departureDate,
              departureTime,
            }}
          />
          <TimeBox label="Hours" value={lateHours} />
          <TimeBox label="Min" value={lateMinutes} />
          <TimeBox label="Sec" value={lateSeconds} /> */}
        </>
      )}
    </View>
  );
};

const TimeBox = ({ label, value }) => {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 5 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {value < 10 ? `0${value}` : value}
      </Text>
      <Text style={{ fontSize: 12 }}>{label}</Text>
    </View>
  );
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10);
}
