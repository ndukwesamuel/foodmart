import React from "react";
import { View, StyleSheet, Text, Image, Pressable, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
import { useNavigation } from "@react-navigation/native";

const profile4 = require("../../../assets/profile-4.png");
const greenMarker = require("../../../assets/greenmarker.png");
const redMarker = require("../../../assets/redmarker.png");
const line = require("../../../assets/arrow-line.png");
const arrowRight = require("../../../assets/arrow-left.png");
import { useSelector, useDispatch } from "react-redux";
// import { Paystack, paystackProps } from "react-native-paystack-webview";
import { Paystack } from "react-native-paystack-webview";
import { useEffect, useRef, useState } from "react";
import { ChangeRouteFun } from "../../shared/Changeroute";
import { BookATripSlice_reset } from "../../../Redux/BookATripSlice";
import {
  reset_RouteSlice,
  Get_Single_Routes_Fun,
} from "../../../Redux/Rider/RouteSlice";
import Code from "../PaymentType/Code";
import Success from "../PaymentType/Success";
import { UserProfile_Fun } from "../../../Redux/AuthSlice";
import PaymentMutation from "../../../utills/PaymentMutation";
const API_Paystack = process.env.EXPO_PUBLIC_Paystack_key;

const Paystack_Secret_Key = process.env.EXPO_PUBLIC_Paystack_Secret_Key;

const Paystack_Public_Key = process.env.EXPO_PUBLIC_Paystack_Public_Key;



const RouteInfo = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const paystackWebViewRef = useRef();
  const {
    get_single_route_data,
    get_single_route_isLoading,
    UserBookSeats_data,
  } = useSelector((state) => state?.RouteSlice);

  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);

  useEffect(() => {
    dispatch(UserProfile_Fun());
    // dispatch(Get_Single_Routes_Fun());

    return () => {};
  }, []);

  const PaymentMutation_Instance = PaymentMutation(user_data.token, dispatch);
  // userProfile_Data,
  // dispatch
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState(false);
  const [failed, setFailed] = useState(false);
  const closeModal = () => {
    setFailed(false);
    setSuccess(false);
    setCode(false);
  };

  const generateCode = () => {
    setSuccess(false);
    setCode(true);
  };
  const showSuccessModal = () => {
    setFailed(false);
    setSuccess(true);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 80,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          marginTop: -10,
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              lineHeight: 25.6,
              color: "#04262F",
              padding: 10,
            }}
          >
            Payment
          </Text>
          <View style={{ gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 5,
                borderBottomWidth: 0.5,
                borderBottomColor: "#0000004D",
                padding: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
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
                  <Text style={{ lineHeight: 21.04 }}>
                    {get_single_route_data?.route?.pickUp}
                  </Text>
                </View>
              </View>
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
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
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
                    {get_single_route_data?.route?.dropOff}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ padding: 10, gap: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  Departure Time
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  {get_single_route_data?.route?.departureTime}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  Number of seat
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  {UserBookSeats_data?.selectedSeats?.length}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  Trip Type
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  One way
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  Trip fare
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "400",
                    lineHeight: 25.6,
                    color: "#04262F",
                    opacity: 0.6,
                  }}
                >
                  ₦
                  {UserBookSeats_data?.selectedSeats?.length *
                    get_single_route_data?.route?.price}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Paystack
          paystackKey={Paystack_Public_Key} //" pk_test_4f6ffc3f55e513cdeb56e13dd9680afd61cb3702"
          paystackSecretKey={Paystack_Secret_Key} //"sk_test_55df4d0e2ef238bf1c941f52e317c5fbd46eea7a"
          billingEmail={`${user_profile_data?.userProfile?.userId?.email}`}
          amount={
            UserBookSeats_data?.selectedSeats?.length *
            get_single_route_data?.route?.price
          }
          billingName={`${user_profile_data?.userProfile?.userId?.userName} ${user_profile_data?.userProfile?.userId?.lastName}`}
          billingMobile={user_profile_data?.userProfile?.userId?.phoneNumber}
          currency="NGN"
          onCancel={(e) => {}}
          onSuccess={(res) => {
            let user_fare =
              UserBookSeats_data?.selectedSeats?.length *
              get_single_route_data?.route?.price;
            let result = {
              paymentType: "card",
              paymentStatus: "success",
              fare: user_fare,

              pickUp: UserBookSeats_data?.get_single_route_data?.route?.pickUp,
              dropOff:
                UserBookSeats_data?.get_single_route_data?.route?.dropOff,
              departureTime:
                UserBookSeats_data?.get_single_route_data?.route?.departureTime,
              seatNumber: UserBookSeats_data?.selectedSeats,
              routeId: UserBookSeats_data?.get_single_route_data?.route?._id,
            };

            PaymentMutation_Instance.mutate(result);

            Alert.alert(
              "Alert",
              "Payment Successful back to Home",

              [
                {
                  text: "OK",
                  onPress: () => {
                    dispatch(reset_RouteSlice());
                    dispatch(BookATripSlice_reset());
                    navigation.navigate("Home");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          ref={paystackWebViewRef}
        />

        <View style={{ gap: 5, padding: 10 }}>
          <Pressable
            onPress={() => paystackWebViewRef.current?.startTransaction()}
            style={{ backgroundColor: "#001272", padding: 10, borderRadius: 8 }}
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
              Make Payment 
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

        {success && (
          <Success generateCode={generateCode} closeModal={closeModal} />
        )}
        {code && <Code closeModal={closeModal} />}
      </View>

      {/* top buttons */}
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.topBtn, { justifyContent: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
        {/* <Pressable
          style={[styles.topBtn, { padding: 3 }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={menuBtn} />
        </Pressable> */}
      </View>
    </View>
  );
};

export default RouteInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000000",
  },
  map: {
    width: "100%",
    height: "45%",
  },

  topBtns: {
    position: "absolute",
    top: 20,
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
