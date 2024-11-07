import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import OtpScreen from "../../screens/OtpScreen";
import { useDispatch, useSelector } from "react-redux";
import ForgetPassowrd from "./ForgetPassowrd";
import ChangePassowrd from "./ChangePassowrd";
import VendorSignup from "./VendorSignup";
import RidersignUp from "./RidersignUp";

const AuthContainer = () => {
  const [authType, setAuthtype] = useState("sign-up");
  const [authType2, setAuthtype2] = useState("otp");
  const [signupType, setSignupType] = useState("user");

  const { otp } = useSelector((state) => state?.OnboardingSlice);

  const changeAuthType = (type) => {
    setAuthtype(type);
  };

  const changeAuthType2 = (type) => {
    setAuthtype2(type);
  };

  const changeSignupType = (type) => {
    setSignupType(type);
  };

  return (
    <View style={{ flex: 1 }}>
      {otp === false ? (
        <>
          {authType === "sign-up" ? (
            <>
              {/* Buttons to switch between User, Vendor, and Rider signup types */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginBottom: 16,
                }}
              >
                <TouchableOpacity onPress={() => changeSignupType("user")}>
                  <Text
                    style={
                      signupType === "user"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    User
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeSignupType("vendor")}>
                  <Text
                    style={
                      signupType === "vendor"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    Vendor
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeSignupType("rider")}>
                  <Text
                    style={
                      signupType === "rider"
                        ? styles.activeTab
                        : styles.inactiveTab
                    }
                  >
                    Rider
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Conditional Rendering based on selected signup type */}
              {signupType === "user" ? (
                <SignUp onSetAuth={changeAuthType} />
              ) : signupType === "vendor" ? (
                <VendorSignup onSetAuth={changeAuthType} />
              ) : (
                <RidersignUp onSetAuth={changeAuthType} />
              )}
            </>
          ) : authType === "sign-in" ? (
            <SignIn onSetAuth={changeAuthType} />
          ) : (
            <ForgetPassowrd onSetAuth={changeAuthType} /> // Forgot Password screen
          )}
        </>
      ) : (
        <>
          {authType2 === "otp" ? (
            <OtpScreen
              onSetAuth={changeAuthType}
              onSetAuth2={changeAuthType2}
            />
          ) : (
            <ChangePassowrd
              onSetAuth2={changeAuthType2}
              onSetAuth={changeAuthType}
            /> // Forgot Password screen
          )}
        </>
      )}
    </View>
  );
};

const styles = {
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500", // Active tab color (e.g., orange)
  },
  inactiveTab: {
    fontSize: 16,
    color: "#A9A9A9", // Inactive tab color (e.g., gray)
  },
};
export default AuthContainer;
