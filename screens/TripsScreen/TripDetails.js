import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Get_all_Trip_Fun,
  Get_single_Trip_Fun,
} from "../../Redux/Rider/TripSLice";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { formatDate } from "../../utills/DateTime";
import Arriving from "../../components/Trip/Arriving";
import Rating from "../../components/Trip/Rating";
const arrowBack = require("../../assets/arrow-back.png");
const redMarker = require("../../assets/redmarker.png");
const greenMarker = require("../../assets/greenmarker.png");
const arrowRight = require("../../assets/arrow-left.png");

const line = require("../../assets/markerline.png");
const line2 = require("../../assets/arrow-line.png");
const TripDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { item } = useRoute()?.params;
  const { Get_single_trip_data } = useSelector((state) => state?.TripSLice);

  const [report, setReport] = useState(false);
  console.log({
    ddd: Get_single_trip_data?.trip,
  });
  useEffect(() => {
    dispatch(Get_single_Trip_Fun(item?._id)); //

    return () => {};
  }, [dispatch]);

  const onReport = () => {
    setReport(false);
  };
  return (
    <View>
      <Image
        source={require("../../assets/mapimage.png")}
        style={{ width: "100%", height: 300 }}
      />
      <View style={{ position: "absolute", top: 60, zIndex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 40,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={arrowBack} />
          </Pressable>

          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            // style={{ position: "absolute", top: 40, right: 30, zIndex: 1 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: 30 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            lineHeight: 36,
            color: "#1E0000",
          }}
        >
          TripDetails
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
            marginTop: 20,
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
              <Text style={{}}>Pickup Bus stop</Text>
              <Text style={{ lineHeight: 21.04 }}>
                {Get_single_trip_data?.trip?.pickUp}
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
            <Image source={arrowRight} style={{ height: 10, marginLeft: -5 }} />
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
                {Get_single_trip_data?.trip?.dropOff}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            borderWidth: 1,

            borderColor: "#D9D9D9",
            borderRadius: 10,
            // paddingHorizontal: 20,
          }}
        >
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
                {Get_single_trip_data?.trip?.routeId?.departureTime}
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
                {formatDate(Get_single_trip_data?.trip?.routeId?.departureDate)}
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
              {/* <Text style={{ lineHeight: 21.04 }}>Departure time</Text> */}
              <Text style={{ lineHeight: 21.04 }}> Route</Text>
            </View>

            <View>
              <Text style={{ lineHeight: 21.04 }}>
                {Get_single_trip_data?.trip?.routeId?.name}
              </Text>
              {/* <Text style={{ lineHeight: 21.04 }}> Route</Text> */}
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 20, textAlign: "center" }}>
          {" "}
          Status: {Get_single_trip_data?.trip?.routeId?.status}
        </Text>

        {Get_single_trip_data?.trip?.routeId?.status != "completed" && (
          <TouchableOpacity
            style={{
              padding: 10,

              gap: 5,
              backgroundColor: "#001272",
              borderRadius: 10,
              marginTop: 50,
            }}
            onPress={() => navigation.navigate("ongoing-trip", { item: item })}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Proceed</Text>
          </TouchableOpacity>
        )}

        <Pressable
          onPress={() =>
            navigation.navigate("Rating", { item: Get_single_trip_data })
          }
          style={{ padding: 10, borderRadius: 8 }}
        >
          <Text
            style={{
              color: "#001272",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24.05,
            }}
          >
            Leave a review!
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TripDetails;
