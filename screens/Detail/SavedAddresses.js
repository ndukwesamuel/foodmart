import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SavedAddresses = () => {
  const navigation = useNavigation();
  const addresses = [
    { id: "1", address: "345 House Estate, Lekki..." },
    { id: "2", address: "345 House Estate, Lekki..." },
    { id: "3", address: "345 House Estate, Lekki..." },
  ];

  const renderAddress = ({ item }) => (
    <View style={styles.addressContainer}>
      <View style={styles.addressContent}>
        <Icon name="map-marker" size={18} color="#f4a261" style={styles.icon} />
        <Text style={styles.addressText}>{item.address}</Text>
      </View>
      <TouchableOpacity>
        <MaterialIcons name="edit" size={18} color="#5a5a5a" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Addresses</Text>

      {/* Address List */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        ListFooterComponent={
          <TouchableOpacity style={styles.addAddress}>
            <Icon name="plus-square-o" size={20} color="#f4a261" />
            <Text style={styles.addText}>Add A New Address</Text>
          </TouchableOpacity>
        }
      />

      {/* Add New Address */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addressContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  addressText: {
    fontSize: 14,
    color: "#333",
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  addText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2a9d8f",
    marginLeft: 8,
  },
});

export default SavedAddresses;
