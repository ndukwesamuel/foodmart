import AppScreen from "../components/shared/AppScreen";
import React, { useState, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import OtpForm from "../ ./OtpForm";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  checkOtp,
  reser_otp,
  reset_otpemail,
  setOtpEmail,
} from "../Redux/OnboardingSlice";
import { UserProfile_Fun, reset_login } from "../Redux/AuthSlice";
import { maincolors } from "../utills/Themes";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

console.log({
  ddd: API_BASEURL,
});

const OtpScreen = ({ navigation, onSetAuth, onSetAuth2 }) => {
  const { otpemail, otp: otpdata } = useSelector(
    (state) => state?.OnboardingSlice
  );

  console.log({
    pop: otpemail,
  });

  const { user_data } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();
  console.log({
    otpdata,
    as: otpemail,
  });
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const length = 4;

  const handleChange = (index, value) => {
    const newCode = code.split("");
    newCode[index] = value;
    setCode(newCode.join(""));
    if (index === length - 1) {
      inputRefs.current[index]?.blur();
    } else if (value !== "") {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const Resend_Mutation = useMutation(
    (data_info) => {
      let url = `https://foodmart-backend.gigtech.site/api/send-verification-otp`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      console.log({ data_info: data_info });

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
      },

      onError: (error) => {
        console.log({
          fada: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  const Otp_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}verify-otp`;

      let datas = {
        // email: otpemail,
        code: code,
        identifier: otpemail, //"customer10@gmail.com",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Authorization: `Bearer ${user_data?.data?.token}`,

          //   "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios.post(url, datas, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message} `,
        });
        // dispatch(UserProfile_Fun());

        dispatch(checkOtp(false));
        dispatch(reset_otpemail());
        dispatch(reset_login());
        dispatch(reser_otp());
        onSetAuth("sign-in");
      },

      onError: (error) => {
        console.log({
          error: error,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });
      },
    }
  );

  return (
    <AppScreen>
      <TouchableOpacity
        style={{
          position: "relative",
          top: 10,
          left: 30,
          borderWidth: 1,
          padding: 5,
          borderRadius: 10,
          width: 35,
        }}
        onPress={() => {
          console.log({
            fff: "Ddfdf",
          });
          dispatch(reset_login());
          dispatch(checkOtp(false));
          dispatch(reset_otpemail());
          dispatch(reset_login());
          onSetAuth("sign-in");
        }}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ gap: 30 }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.heading}>OTP Verification</Text>

            <Text>A one time pin has been sent to your mail</Text>
          </View>
          {/* phone numbers */}
          <View style={{ gap: 10 }}>
            <Text
              style={{
                color: "#06094F",
                fontSize: 16,
                lineHeight: 23,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Enter the 4- digit code sent to{" "}
              <Text style={{ fontWeight: "500" }}>Email</Text>
            </Text>

            {/* <Text
            style={{
              color: "#06094F",
              textDecorationLine: "underline",
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Edit Phone Number
          </Text> */}
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {[...Array(length)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    width: 60,
                    height: 60,
                    textAlign: "center",
                    margin: 10,
                    borderRadius: 10,
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => handleChange(index, value)}
                  value={code[index] || ""}
                  editable={!loading}
                />
              ))}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor:
                  code.length === length ? maincolors.primary : "transparent", //  "#CC5600",

                borderWidth: code.length === length ? 0 : 1, //  "#CC5600",

                borderColor:
                  code.length === length
                    ? maincolors.primary
                    : maincolors.primary, //"transparent", //  "#CC5600",

                width: "90%",
                borderRadius: 10,
                alignSelf: "center",
                marginTop: 10,
                paddingVertical: 5,
              }}
              onPress={() => Otp_Mutation.mutate()}
              // onPress={() => onSetAuth2("change")}
            >
              {Otp_Mutation?.isLoading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      code.length === length ? "white" : maincolors.primary,

                    padding: 10,
                  }}
                >
                  Verify OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* resend */}
          <Pressable
            onPress={() =>
              Resend_Mutation.mutate({
                identifier: otpemail,
              })
            }
          >
            <Text style={styles.resend}>
              Resending OTP
              {/* <Text style={{ fontWeight: "500" }}>Resend</Text> */}
              {Resend_Mutation.isLoading && (
                <ActivityIndicator color="blue" size="small" />
              )}
            </Text>
          </Pressable>
        </View>
      </View>
    </AppScreen>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },

  heading: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 36,
  },

  resend: {
    fontSize: 16,
    color: "#06094F",
    fontWeight: "400",
    lineHeight: 23,
    textAlign: "center",
  },
});
