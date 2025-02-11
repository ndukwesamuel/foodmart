import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import {
  Get_all_addresses,
  Get_all_states,
  Get_an_address,
} from "../../Redux/AddressSlice";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import axios from "axios";

const API_BASEURL = "https://foodmart-backend.gigtech.site/api/";

export default function EditAddress({ route }) {
  const item = route?.params?.item || ""; // Check if an address is being edited
  const isEditing = item !== ""; // Determine if it's an update or new address
  const dispatch = useDispatch();
  const { Get_an_address_data, Get_all_states_data } = useSelector(
    (state) => state?.AddressSlice
  );
  const { user_data } = useSelector((state) => state?.Auth);

  const [isEditable, setIsEditable] = useState(!isEditing);
  const [address, setAddress] = useState(
    isEditing ? Get_an_address_data?.data || {} : {} // Set empty object for new address
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isEditing) {
      dispatch(Get_an_address(item));
    }
    dispatch(Get_all_states());
  }, [dispatch]);

  useEffect(() => {
    if (isEditing && Get_an_address_data?.data) {
      setAddress(Get_an_address_data?.data);
    }
  }, [Get_an_address_data]);

  useEffect(() => {
    if (!isEditing) {
      getUserLocation(); // Request location only when adding a new address
    }
  }, [isEditing]);

  // Update Address Mutation
  const UpdateAddress_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/addresses/${item}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({ type: "success", text1: `${success?.data?.message}` });
        dispatch(Get_all_addresses());
        setIsEditable(false);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  // Add New Address Mutation
  const AddAddress_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/customer/addresses`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({ type: "success", text1: `${success?.data?.message}` });
        dispatch(Get_all_addresses());
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleSaveAddress = () => {
    const addressData = { ...address, is_default: 0 };

    if (isEditing) {
      UpdateAddress_Mutation.mutate(addressData);
    } else {
      AddAddress_Mutation.mutate(addressData);
    }
  };
  const [location, setLocation] = useState(null);

  const getUserLocation = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "We need access to your location to add your address",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          let location = await Location.getCurrentPositionAsync({});
          console.log("Coordinates:", location.coords);

          // Reverse geocode to get address details
          let [address] = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          console.log({ location: address });

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
                  AddAddress_Mutation.mutate(data);
                  console.log("Address Data Confirmed:", data);
                  // Additional logic here, e.g., save the address to the server
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Location Permission Denied",
            "Permission to access location was denied."
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
    //  else {
    //   // For iOS, permissions are usually handled automatically
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const { latitude, longitude } = position.coords;
    //       setLocation({ latitude, longitude });
    //       console.log({ location: location });
    //     },
    //     (error) => Alert.alert("Error", error.message),
    //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //   );
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReusableBackButton />
      <ReusableTitle
        data={isEditing ? "Confirm your address" : "Add New Address"}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.input}
          value={address?.street_address || ""}
          onChangeText={(text) =>
            setAddress({ ...address, street_address: text })
          }
          editable={isEditable}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={address?.city || ""}
          onChangeText={(text) => setAddress({ ...address, city: text })}
          editable={isEditable}
        />
      </View>

      {/* State Selection with Modal */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>State/Province</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => isEditable && setModalVisible(true)}
          disabled={!isEditable}
        >
          <Text>{address?.state || "Select State"}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for State Selection */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={Get_all_states_data?.data || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.stateItem}
                    onPress={() => {
                      setAddress({ ...address, state: item.name });
                      setModalVisible(false);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip/Postal Code</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={address?.zip || ""}
          onChangeText={(text) => setAddress({ ...address, zip: text })}
          editable={isEditable}
        />
      </View>

      {/* Country Field - Static */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country</Text>
        <TextInput style={styles.input} value="Nigeria" editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Save this address as</Text>
        <TextInput
          style={styles.input}
          value={address?.name || ""}
          onChangeText={(text) => setAddress({ ...address, name: text })}
          editable={isEditable}
        />
      </View>

      {/* Dynamic Save Button */}
      {isEditing && !isEditable ? (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditable(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      ) : UpdateAddress_Mutation.isLoading || AddAddress_Mutation.isLoading ? (
        <TouchableOpacity style={styles.saveButton}>
          <ActivityIndicator color={"white"} size={"small"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Add Address"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#e0e0e0",
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  stateItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
});
