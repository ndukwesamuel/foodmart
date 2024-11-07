import React from "react";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import SelectedRouteDetails from "./SelectedRouteDetails";
const arrowBack = require("../../../assets/arrow-back.png");

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import PassengersList from "./PassengersList";
const profile4 = require(" ../../../assets/profile-4.png");
const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/arrow-line.png");
const arrowRight = require("../../../assets/arrow-left.png");
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Get_Single_Routes_Fun } from " ../../../Redux/Rider/RouteSlice";
import { ChangeRouteFun } from "../../shared/Changeroute";

const SelectedRoute = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { _id } = route.params?.data;

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const { get_single_route_data, get_single_route_isLoading } = useSelector(
    (state) => state?.RouteSlice
  );

  const onRefresh = () => {
    setRefreshing(true);

    // Perform your refresh action here, e.g., fetching new data

    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay, replace with actual refresh logic
  };

  useEffect(() => {
    dispatch(Get_Single_Routes_Fun(_id)); //

    return () => {};
  }, [dispatch]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginTop: -10,
        padding: 10,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#001272"]}
          tintColor={"#001272"}
        />
      }
    >
      <View
        style={{
          flex: 1,
          // flex: 1,
          // backgroundColor: "white",
          // borderTopRightRadius: 10,
          // borderTopLeftRadius: 10,
          // marginTop: -10,
          // padding: 10,
        }}
      >
        {get_single_route_isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <>
            {/* container details */}
            <View
              style={{
                gap: 20,
                flex: 1,
                // borderWidth: 0.5,
                // height: "60%",
              }}
            >
              <Text style={styles.heading}>
                {get_single_route_data?.route?.busId?.plateNumber}
              </Text>
              <View style={{ gap: 10 }}>
                {/* bus plate number */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* left */}
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ height: 21.12, width: 21.12, borderRadius: 50 }}
                      source={profile4}
                    />
                    <Text style={[styles.semiboldText, { fontWeight: "400" }]}>
                      Bus Plate Number
                    </Text>
                  </View>

                  {/* right */}
                  <Text style={styles.semiboldText}>
                    {get_single_route_data?.route?.busId?.plateNumber}
                  </Text>
                </View>

                {/* trip fare */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.semiboldText, { fontWeight: "400" }]}>
                    Trip fare
                  </Text>
                  <Text style={styles.semiboldText}>
                    ₦ {get_single_route_data?.route?.price}
                  </Text>
                </View>

                {/* bus stations */}
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
                        {get_single_route_data?.route?.pickUp}
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
                    <Image source={line} style={{ width: "90%" }} />
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
                      <Text style={styles.busStationPrimary}>
                        Dropoff Bus stop
                      </Text>
                      <Text style={{ lineHeight: 21.04 }}>
                        {get_single_route_data?.route?.dropOff}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* passendger list */}

              <View style={{ flex: 1 }}>
                {get_single_route_data?.route?.passengers?.length === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      height: "70%",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "500",
                        lineHeight: 24.05,
                      }}
                    >
                      No passengers
                    </Text>
                  </View>
                ) : (
                  <PassengersList
                    data={get_single_route_data?.route?.passengers}
                  />
                )}
              </View>

              <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Select-Seat", {
                      data: get_single_route_data,
                    })
                  }
                  style={{
                    backgroundColor: "#001272",
                    padding: 10,
                    borderRadius: 8,
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
                <Pressable
                  onPress={() => ChangeRouteFun(dispatch, navigation)}
                  style={{ padding: 10 }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "500",
                      lineHeight: 24.05,
                    }}
                  >
                    Change Route
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* buttons */}
          </>
        )}
      </View>

      <Pressable
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 6,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image source={arrowBack} />
      </Pressable>
    </ScrollView>
  );
};

export default SelectedRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "30%",
  },

  details: {
    gap: 20,
  },

  heading: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 36,
  },

  semiboldText: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 25.6,
    color: "#04262F",
  },

  busStationPrimary: {
    fontSize: 12,
    color: "#1E0000",
    opacity: 0.4,
    lineHeight: 18.04,
  },
});
