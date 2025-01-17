import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { CustomCheckbox, Forminput } from "../../components/shared/InputForm";
import Checkbox from "expo-checkbox";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import OrderPlacingScreen from "../../components/CheckoutStatus";
import { useNavigation } from "@react-navigation/native";
import { useApiRequest } from "../../hooks/Mutate";
import { useSelector } from "react-redux";
import { maincolors } from "../../utills/Themes";
import Toast from "react-native-toast-message";
import WebView from "react-native-webview";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function CheckoutPage({ route }) {
  const { item } = route?.params;
  console.log({
    moses: item,
  });

  const navigation = useNavigation();

  const [dataSummary, setdataSummary] = useState(null);

  const total = item?.cart_items.reduce((acc, item) => acc + item.sub_total, 0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method

  console.log({
    nnn: total,
  });
  const [makePaymenr, setMakePaymenr] = useState(null);
  const [checkout, setcheckout] = useState(true);
  useEffect(() => {
    summary({
      address_id: 1,
      promo_code: "",
    });
    return () => {};
  }, []);

  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  let delivery = 42500;
  let service = 42500;

  let mainTotal =
    dataSummary?.sub_total +
    dataSummary?.delivery_fee +
    dataSummary?.service_charge;
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method); // Set the selected payment method
  };

  const { mutate: Checkout, isLoading: isLoadingCheckout } = useApiRequest({
    url: `${API_BASEURL}v1/customer/orders`,
    method: "POST",
    token: user_data?.data?.token || "",
    onSuccess: (response) => {
      console.log({
        vvv: response?.data?.data?.payment,
      });

      setMakePaymenr(response?.data?.data?.payment);

      setcheckout(false);
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
      });

      // navigation.goBack();
      // console.log("Category created successfully:", response.data);
    },

    onError: (error) => {
      console.log({
        peterkc: error?.response?.data?.message,
      });
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message}`,
      });

      return;
      // console.error("Category creation failed:", error?.response?.data);
    },
  });

  const { mutate: summary, isLoading: isLoadingsummary } = useApiRequest({
    url: `${API_BASEURL}v1/customer/carts/1/summary`,

    method: "GET",
    token: user_data?.data?.token || "",
    onSuccess: (response) => {
      // dispatch(checkOtp(true));
      console.log({
        kkk: response?.data?.data,
      });

      setdataSummary(response?.data?.data);
      // setlga(response?.data?.data);
    },
    onError: (error) => {
      // console.error("Registration failed:", error?.response?.data);
      console.log({
        hfhf: error?.response?.data,
      });
      // Toast.show({
      //   type: "error",
      //   text1: `${error?.response?.data?.message || "Request failed."}`,
      // });
    },
  });

  return (
    <AppScreen>
      {checkout ? (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
          <ReusableBackButton
            style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
          />
          <ReusableTitle data="Checkout" />

          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
          >
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.sectionTitle}>
                  {item?.vendor?.business_name}
                </Text>
                <Text style={{ color: "#CB0505", fontSize: 14 }}>
                  Delete All
                </Text>
              </View>
              <View style={styles.line}></View>
              <View style={{ gap: 16 }}>
                {item?.cart_items?.map((item, index) => (
                  <View style={{ flexDirection: "row", gap: 16 }}>
                    <Text style={{ color: "#F79B2C", fontSize: 16 }}>
                      X{item?.quantity}
                    </Text>
                    <View style={{ gap: 8 }}>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 20,
                        }}
                      >
                        <Text style={styles.secondaryText}>
                          {item?.menu_item?.name}
                        </Text>
                        <Text style={styles.secondaryText}>
                          {item?.menu_item?.price}
                        </Text>
                      </View>

                      {item?.extras.length > 0 && (
                        <>
                          {item?.extras.map((item, index) => (
                            <View style={{ gap: 3 }}>
                              <Text style={styles.optionText}>
                                {item?.extra_option?.name}
                              </Text>
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", gap: 11 }}>
                <Image source={require("../../assets/Foodmart/cutlery.png")} />
                <View style={{ gap: 8 }}>
                  <Text>Need Cutlery</Text>
                  <Text>Help us reduce waste, only ask if needed</Text>
                </View>
              </View>
              <View>
                <Image />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>Use Promo Code </Text>
              <Forminput style={styles.input} placeholder={"#HURRAY31"} />
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Delivery Details</Text>
              <View style={styles.line}></View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#C4C4C4",
                  borderWidth: 1,
                  padding: 10,
                  gap: 99,
                  borderRadius: 6,
                }}
              >
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image
                    source={require("../../assets/Foodmart/phoneIcon.png")}
                  />
                  <Text style={styles.optionText}>0816 432 8897</Text>
                </View>
                <Image />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderColor: "#C4C4C4",
                  borderWidth: 1,
                  padding: 10,
                  gap: 99,
                  borderRadius: 6,
                }}
              >
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image
                    source={require("../../assets/Foodmart/carbon_location.png")}
                  />
                  <Text style={styles.optionText}>
                    Lorem ipsumm lorem ipsum
                  </Text>
                </View>
                <Image />
              </View>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
              <View style={styles.line}></View>
              <View style={{ gap: 22 }}>
                {/* <CustomCheckbox
                  label={"Visa"}
                  value={selectedPaymentMethod === "Visa"} // Set the value based on the selected method
                  onValueChange={() => handlePaymentMethodChange("Visa")}
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                /> */}
                {/* CustomCheckbox for Wallet */}
                <CustomCheckbox
                  label={"Wallet"}
                  value={selectedPaymentMethod === "Wallet"}
                  onValueChange={() => handlePaymentMethodChange("Wallet")}
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                />
                {/* CustomCheckbox for Another Card */}
                {/* <CustomCheckbox
                  label={"Another Card"}
                  value={selectedPaymentMethod === "Another Card"}
                  onValueChange={() =>
                    handlePaymentMethodChange("Another Card")
                  }
                  containerView={styles.checkbox}
                  TextStyle={styles.optionText}
                /> */}
              </View>
            </View>
            <View style={{ gap: 10, marginBottom: 20 }}>
              <View style={{ gap: 8 }}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <View style={styles.line}></View>
                <View style={{ gap: 16 }}>
                  <View style={{ gap: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Sub Total</Text>
                      <Text style={styles.optionText}>
                        {dataSummary?.sub_total}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Delivery Fee</Text>
                      <Text style={styles.optionText}>
                        {dataSummary?.delivery_fee}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.optionText}>Service</Text>
                      <Text style={styles.optionText}>
                        {dataSummary?.service_charge}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.line}></View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Total</Text>
                    <Text>{mainTotal}</Text>
                  </View>
                </View>
              </View>

              {isLoadingCheckout ? (
                <ActivityIndicator size="large" color={maincolors.primary} />
              ) : (
                <PrimaryButton
                  buttonText={"Confirm Order"}
                  action={() => {
                    console.log(selectedPaymentMethod);
                    let condition = selectedPaymentMethod === "Wallet";

                    if (condition) {
                    }
                    let data = {
                      cart_id: item?.id, //1, //Refer to get all carts "Cart/Get All Carts"
                      use_points: true,
                      use_wallet:
                        selectedPaymentMethod === "Wallet" ? true : false,
                      address_id: 1, //Refer to "Address/Get all Addresses"
                    };

                    console.log({
                      xxx: data,
                    });

                    Checkout(data);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <WebView
            source={{ uri: "https://checkout.paystack.com/vxvvqfpg80ejdas" }}
            onNavigationStateChange={(event) => {
              console.log({
                ggg: event,
              });
              if (event.url.includes("success")) {
                // Handle successful payment
                setMakePaymenr(null);
                setcheckout(true);
                navigation.goBack();
                console.log("Payment Successful");
              } else if (event.url.includes("failure")) {
                // Handle failed payment
                console.log("Payment Failed");
              }
            }}
          />
        </View>
        // <OrderPlacingScreen action={() => setcheckout(true)} />
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
  input: {
    borderRadius: 6,
    borderWidth: 0.68,
    borderColor: "#68686880",
    height: 50,
  },
  checkbox: {
    flexDirection: "row",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  optionText: {
    fontSize: 14,
    color: "#686868",
  },
  secondaryText: {
    color: "#023526",
    fontSize: 16,
    fontWeight: "500",
  },
});

// import { View, Text } from "react-native";
// import React from "react";

// const CheckoutPage = ({ route }) => {
//   console.log({
//     mmm: route?.params,
//   });
//   return (
//     <View>
//       <Text>CheckoutPage</Text>
//     </View>
//   );
// };

// export default CheckoutPage;
