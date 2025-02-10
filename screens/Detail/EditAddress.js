import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { Get_an_address } from "../../Redux/AddressSlice";

export default function EditAddress() {
  const dispatch = useDispatch();
  const { Get_an_address_data } = useSelector((state) => state?.AddressSlice);
  //   const storedAddress = useSelector((state) => state?.user?.address); // Get address from Redux state
  const [isEditable, setIsEditable] = useState(false);
  const [address, setAddress] = useState(Get_an_address_data?.data || {}); // Local copy for editing
  console.log({ Get_an_address_data: Get_an_address_data });

  // Update local state when storedAddress changes
  useEffect(() => {
    dispatch(Get_an_address(1)); // Fetch address once when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (Get_an_address_data?.data) {
      setAddress(Get_an_address_data?.data);
    }
  }, [Get_an_address_data]); // Update local state when Redux data changes

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ReusableBackButton />
      <ReusableTitle data={"Confirm your address"} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.input}
          value={address?.street || ""}
          onChangeText={(text) => setAddress({ ...address, street_address: text })}
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>State/Province</Text>
        <TextInput
          style={styles.input}
          value={address?.state || ""}
          onChangeText={(text) => setAddress({ ...address, state: text })}
          editable={isEditable}
        />
      </View>

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
        <TextInput
          style={styles.input}
          value="Nigeria"
          editable={false} // Static value
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Save this address as</Text>
        <TextInput
          style={styles.input}
          value={address?.nickname || ""}
          onChangeText={(text) => setAddress({ ...address, name: text })}
          editable={isEditable}
        />
      </View>

      {!isEditable ? (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditable(true)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setIsEditable(false)}
        >
          <Text style={styles.buttonText}>Save</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});
