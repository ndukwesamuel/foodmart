import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native"; // To handle navigation
import { maincolors } from "../utills/Themes";

export const ResturantComponent = () => {
  return (
    <View>
      <Text>ResturantComponent</Text>
    </View>
  );
};

export const ResturantComponentMenu = ({ data }) => {
  const { all_menu_item_for_resturant_data, Get__Restaurant_detail_data } =
    useSelector((state) => state.RestaurantSlice);

  const navigation = useNavigation(); // Ensuring navigation is used properly

  // Filter items based on the `data` category
  const filteredItems = all_menu_item_for_resturant_data?.filter((item) =>
    item.categories?.some((category) => category.name === data)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{data.toUpperCase()}</Text>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()} // Use `id` as a unique key
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate("FoodDetails", {
                item,
                vendor_id: Get__Restaurant_detail_data?.data?.id,
              })
            }
          >
            <View style={styles.menuDetails}>
              <Text style={styles.menuTitle}>{item?.name}</Text>
              <Text style={styles.menuDescription}>{item?.description}</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.menuPrice}>₦{item.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() =>
                    navigation.navigate("FoodDetails", { itemId: item?.id })
                  } // Pass item details to the FoodDetails screen
                >
                  <Text
                    style={{
                      color: maincolors.primary,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Image
              source={{ uri: item?.default_image?.original_url }} // Ensure correct path to image
              style={styles.menuImage}
            />
            {/* )} */}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.menuDescription}>
            No items found for this category.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
  },
  menuDetails: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  addButton: {
    backgroundColor: "#023526",
    borderRadius: 50,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
