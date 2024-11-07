import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons

import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
const arrowRight = require("../../assets/arrow-left.png");

import AvailableBusItem from "../../components/Booking/AvailableBus/AvailableBusItem";
import AvailableBusItems from "../../components/Booking/AvailableBus/AvailableBusItems";
import { Get_all_Trip_Fun } from "../../Redux/Rider/TripSLice";
import { formatDate, formatDateandTime } from "../../utills/DateTime";
import { Get_all_driver_Trip_Fun } from "../../Redux/Driver/DriverTripSLice";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");

const profile1 = require("../../assets/profile-1.png");
const profile2 = require("../../assets/profile-2.png");
const profile3 = require("../../assets/profile-3.png");
const profile4 = require("../../assets/profile-4.png");
const greenMarker = require("../../assets/greenmarker.png");
const redMarker = require("../../assets/redmarker.png");
const line = require("../../assets/markerline.png");
const line2 = require("../../assets/arrow-line.png");

const TripPage = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [modaldata, setModaldata] = useState(null);

  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const { Get_All_drive_trip_data } = useSelector(
    (state) => state?.DriverTripSLice
  );

  console.log({
    qwqw: Get_All_drive_trip_data?.route[0],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_all_driver_Trip_Fun()); //

    return () => {};
  }, [dispatch]);

  const toggleModal = (type) => {
    setShowModal(!showModal);
    setModaldata(type);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Get_all_driver_Trip_Fun()); //

    // Wait for 2 seconds
    setRefreshing(false);
  };

  let data = {};

  const sortedTrips = Get_All_drive_trip_data?.route
    ? [...Get_All_drive_trip_data.route].sort(
        (a, b) => new Date(b?.departureDate) - new Date(a?.departureDate)
      )
    : [];

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "space-between",
        padding: 20,
        paddingTop: 50,
        // borderWidth: 0.5,
        // borderColor: "#D9D9D9",
      }}
    >
      <View style={{ gap: 20, paddingBottom: 0, flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ position: "absolute", top: 30, right: 30, zIndex: 1 }}
        >
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        {/* menu and back button */}

        {/* Available Buses */}
        <View style={{ gap: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "900",
              lineHeight: 36,
              color: "#1E0000",
            }}
          >
            Your Trips
          </Text>
        </View>

        {/* list items */}

        <View style={{ flex: 1 }}>
          {sortedTrips?.length > 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {sortedTrips?.map((item) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("drivertripdetails", { item })
                  }
                  style={{
                    borderWidth: 0.5,
                    borderRadius: 10,
                    marginVertical: 10,
                  }}
                  key={item?._id}
                >
                  <View
                    style={{
                      padding: 10,
                      borderBottomWidth: 0.5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {/* left */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Image source={greenMarker} />
                        <View>
                          <Text style={styles.busStationPrimary}>
                            Pickup Bus stop
                          </Text>
                          <Text style={{ lineHeight: 21.04 }}>
                            {item?.pickUp}
                          </Text>
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
                        <Image source={line2} style={{ width: "90%" }} />
                        <Image
                          source={arrowRight}
                          style={{ height: 10, marginLeft: -5 }}
                        />
                      </View>

                      {/* right */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
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
                          <Text style={{ lineHeight: 21.04 }}>
                            {item?.dropOff}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ lineHeight: 21.04 }}>Departure time</Text>
                      {/* <Text style={{ lineHeight: 21.04 }}> Route</Text> */}
                    </View>

                    <View>
                      <Text style={{ lineHeight: 21.04 }}>
                        {item?.departureTime}
                      </Text>
                      {/* <Text style={{ lineHeight: 21.04 }}> Route</Text> */}
                    </View>
                  </View>

                  <View
                    style={{
                      padding: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ lineHeight: 21.04 }}>Departure Day</Text>
                      {/* <Text style={{ lineHeight: 21.04 }}> Route</Text> */}
                    </View>

                    <View>
                      <Text style={{ lineHeight: 21.04 }}>
                        {formatDate(item?.departureDate)}
                        {/* {item?.routeId?.departureDate} */}
                      </Text>
                      {/* <Text style={{ lineHeight: 21.04 }}> Route</Text> */}
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 25.6,
                  fontWeight: "500",
                  color: "#1E0000",
                }}
              >
                No Available Buses
              </Text>
            </View>
          )}
        </View>
      </View>
      {showModal && (
        <AvailableBusItem onHideModal={toggleModal} data={modaldata} />
      )}
    </View>
  );
};

export default TripPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  listItems: {
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
