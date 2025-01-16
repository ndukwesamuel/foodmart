import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { maincolors } from "../utills/Themes";
import AppScreen from "../components/shared/AppScreen";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Account from "../components/Auth/Account";
import CartScreen from "../components/CartScreen";
import { useSelector } from "react-redux";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  const [showaccount, setShowaccount] = useState(false);

  const [notification, setnotification] = useState("home");

  const cart_state = () => {
    if (notification === "cart") {
      setnotification("home");
    } else {
      setnotification("cart");
    }
    console.log("this is working ");
  };

  return (
    <AppScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setnotification("account")}>
            <Image
              source={{
                uri: user_profile_data?.data?.profile_picture_url, //"https://s3-alpha-sig.figma.com/img/9265/f6e3/e22a4d011fdf9bee1bc447fd54300962?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=frC5B-Z2NhGFgmYjZ7O0ExewGy2ZjbMA5TANJZKdox689M0O-rBcTykS5g2slmFVlViF4SUIvCt2ks5LKcLolm5iJX63JcLEaHE6aw4~rkvMUyn5znE~UBF~7UYDUz-8Skn18O8lOQRSRZYnh84j9k8nW58AR7f3lsQ23wWBPv1GAUAkHbNboCMDA4p4lz1LtA6Ape6MA0Anu0X4MJvZ1x5H4djNdqpZbOioRsifMI-7HSujIWt30-JcUG24g6yBVz1cyB0nTUbQKHX3BJbJdBFMCp4H-gWGRNq0RPfdATZf4H~UlL~uahR7W0t6fECapBmo42FwUortllMJE82taQ__",
              }} // Replace with profile picture URL
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.searchInput,
              {
                flexDirection: "row",
                // justifyConten
                alignItems: "center",
              },
            ]}
          >
            <AntDesign name="search1" size={24} color="black" />

            <TextInput placeholder="search" style={styles.searchInput} />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={cart_state}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {notification === "home" && (
          <>
            {/* Address Section */}
            <View style={styles.addressContainer}>
              <Text style={styles.addressText}>
                Address lorem dolor officia...
              </Text>
            </View>

            {/* Cashback Promo Section */}
            <View style={styles.promoContainer}>
              <View>
                <Text style={styles.promoText}>
                  Get 20% cashback this weekend!
                </Text>
                <Text style={styles.promoCode}>Using promo code</Text>
                <Text style={styles.boldText}>#HURRAY31</Text>
              </View>

              <View>
                <Image
                  source={require("../assets/Foodmart/c1ef1b8e0645087980b220d0e63f6b27.png")}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
            </View>

            {/* Greeting Section */}
            <View>
              <Text style={styles.greetingText}>
                Hello {user_profile_data?.data?.name},
              </Text>
              <Text style={styles.subText}>Go through;</Text>
            </View>

            {/* Discounts & Restaurants Sections */}
            <View
              style={{
                // borderWidth: 1,
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#FDEAFF",
                  paddingVertical: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={require("../assets/Foodmart/9d7f0465473f1920b8ac765eb8ea253e.png")}
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionText}>Discounts</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFEAEA",
                  paddingVertical: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                onPress={() => navigation.navigate("MainHomescreen")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={require("../assets/Foodmart/2ce413b72e9acde68de20afc7bef46ff.png")}
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionText}>Restaurants</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
        {notification === "cart" && <CartScreen />}
        {notification === "account" && (
          <Account onCLose={() => setnotification("home")} />
        )}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  iconContainer: {
    flexDirection: "row",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  addressContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  addressText: {
    color: "#888",
  },
  promoContainer: {
    backgroundColor: "#eaf7ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  promoText: {
    color: "#333",
    fontWeight: "bold",
    marginBottom: 4,
  },
  promoCode: {
    color: "#555",
  },
  boldText: {
    fontWeight: "bold",
    color: maincolors.primary, // "#ff5a5f",
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginBottom: 4,
  },
  subText: {
    color: "#555",
    marginBottom: 16,
  },
  optionsContainer: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  optionBox: {
    // flex: 1,
    backgroundColor: "#ffeaf0",
    borderRadius: 8,
    alignItems: "center",
    // alignSelf: "center",
    // padding: 16,
    marginHorizontal: 8,
    flexDirection: "row",
    marginBottom: 10,
  },
  optionIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  optionText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
