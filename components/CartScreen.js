import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CartScreen = () => {
  const cartData = [
    {
      restaurant: "Restaurant 1",
      items: [
        {
          name: "Rice",
          price: 5500,
          quantity: 1,
          image: "https://via.placeholder.com/80",
        },
        {
          name: "Drink",
          price: 5500,
          quantity: 1,
          image: "https://via.placeholder.com/80",
        },
      ],
    },
    {
      restaurant: "Restaurant 2",
      items: [
        {
          name: "Avocado",
          price: 5500,
          quantity: 1,
          image: "https://via.placeholder.com/80",
        },
        {
          name: "Avocado",
          price: 5500,
          quantity: 1,
          image: "https://via.placeholder.com/80",
        },
      ],
    },
  ];

  const renderCartItems = (items) => {
    return items.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₦{item.price.toLocaleString()}</Text>
        </View>
        <Text style={styles.itemQuantity}>x{item.quantity}</Text>
      </View>
    ));
  };

  const renderCartSections = ({ item }) => (
    <View style={styles.cartSection}>
      <View style={styles.cartHeader}>
        <Text style={styles.restaurantName}>{item.restaurant}</Text>
        <TouchableOpacity>
          <Text style={styles.deleteAll}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {renderCartItems(item.items)}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Continue to checkout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Cart</Text>
        <Text style={styles.tab}>Ongoing</Text>
        <Text style={styles.tab}>Delivered</Text>
      </View>

      {/* Cart List */}
      <FlatList
        data={cartData}
        renderItem={renderCartSections}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  searchText: {
    marginLeft: 8,
    color: "#6c757d",
  },
  icon: {
    marginHorizontal: 8,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    fontSize: 16,
    color: "#6c757d",
    fontWeight: "500",
  },
  activeTab: {
    color: "#ffa500",
    borderBottomWidth: 2,
    borderBottomColor: "#ffa500",
  },
  cartSection: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f5132",
  },
  deleteAll: {
    fontSize: 14,
    color: "#dc3545",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 14,
    color: "#0f5132",
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 12,
    color: "#6c757d",
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f5132",
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: "#ffa500",
    paddingVertical: 12,
    borderRadius: 8,
  },
  checkoutText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default CartScreen;
