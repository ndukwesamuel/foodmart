import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { UserProfile_Fun, reset_login } from "../../Redux/AuthSlice";
import { Ionicons } from "@expo/vector-icons";

// import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

console.log({
  ksks: API_BASEURL,
});

const LocationAccessScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  const dispatch = useDispatch();
  console.log({
    lkl: user_data?.data?.token,
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // Get current position
      let location = await Location.getCurrentPositionAsync({});
      console.log("Coordinates:", location.coords);

      // Reverse geocode to get address details
      let [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      console.log("Address Details:", address);
      console.log("Address :", address?.formattedAddress);

      // You can extract and display address details
      //   alert(
      //     `Street: ${address.street}\nCity: ${address.city}\nState: ${address.region}\nPostal Code: ${address.postalCode}\nCountry: ${address.country}`
      //   );
      let data = {
        name: "home",
        street_address: address?.formattedAddress,
        city: address?.subregion,
        state: address?.region,
        country: address?.country,
        zip: address?.postalCode,
        is_default: 1,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };
      //   console.log({
      //     kkk: data,
      //   });

      Alert.alert(
        "Confirm Address",
        `Street: ${data.street_address}\nCity: ${data.city}\nState: ${data.state}\nPostal Code: ${data.zip}\nCountry: ${data.country}`,
        [
          {
            text: "Cancel Upload",
            style: "cancel",
            onPress: () => {
              //   setUploading(false); // Stop the upload
              console.log("Upload Canceled");
            },
          },
          {
            text: "OK",
            onPress: () => {
              AddressMutation.mutate(data);
              console.log("Address Data Confirmed:", data);
              // Additional logic here, e.g., save the address to the server
            },
          },
        ]
      );
      //   AddressMutation.mutate(data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const AddressMutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/customer/addresses`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        console.log({
          jajaj: success?.data,
        });
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        dispatch(UserProfile_Fun());

        // dispatch(checkOtp(true));
      },
      onError: (error) => {
        dispatch(UserProfile_Fun());

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image source={require("../../assets/Foodmart/rafiki.png")} />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
        Grant Location Access
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#777",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Enable location access to enhance delivery accuracy...
      </Text>

      {AddressMutation.isLoading ? (
        <ActivityIndicator color="#F8991E" size="large" />
      ) : (
        <>
          <TouchableOpacity
            style={{
              backgroundColor: "#F8991E",
              padding: 15,
              borderRadius: 8,
              width: "80%",
              alignItems: "center",
              marginBottom: 12,
            }}
            onPress={getLocation}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontSize: 16 }}>
                Enable Location
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 15,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#F8991E",
              width: "80%",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("ManualAddress")}
          >
            <Text style={{ color: "#F8991E", fontSize: 16 }}>Set Manually</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const ManualAddressScreen = ({ route }) => {
  //   const { coords } = route.params || {}; // Coordinates from previous screen
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Nigeria",
    nickname: "",
  });

  let coords = {};

  const handleSave = () => {
    console.log("Address Details:", address);
    console.log("User Coordinates:", coords);
    alert("Address Saved Successfully!");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Confirm your address
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
        placeholder="Street Address"
        onChangeText={(text) => setAddress({ ...address, street: text })}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
        placeholder="City"
        onChangeText={(text) => setAddress({ ...address, city: text })}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
        placeholder="State/ Province"
        onChangeText={(text) => setAddress({ ...address, state: text })}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
        placeholder="Zip/ Postal Code"
        keyboardType="numeric"
        onChangeText={(text) => setAddress({ ...address, zip: text })}
      />
      <Text style={{ fontSize: 16, marginBottom: 15, color: "#333" }}>
        Country: Nigeria
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
        placeholder="Save this address as"
        onChangeText={(text) => setAddress({ ...address, nickname: text })}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#F8991E",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleSave}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function AddressData() {
  const dispatch = useDispatch();
  return (
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50,
          left: 30,
          borderWidth: 1,
          padding: 5,
          borderRadius: 10,
          width: 35,
          zIndex: 10,
        }}
        onPress={() => {
          // console.log("this is otpemail", otpemail);
          // dispatch(checkOtp(false));
          // onSetAuth("sign-in");
          dispatch(reset_login());
        }}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <LocationAccessScreen />
    </>
    // <View>
    // <ManualAddressScreen />
    // </View>
  );
}
