import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_All_Menu_Items_For_A_Resturant_Fun,
  Get_single_restaurants,
} from "../../Redux/RestaurantSlice";
import { ResturantComponentMenu } from "../../components/ResturantComponent";

const RestaurantMenuScreen = ({ route }) => {
  const { item } = route.params;
  const {
    Get_All_Restaurant_data,
    Get__Restaurant_detail_data,
    all_menu_item_for_resturant_data,
  } = useSelector((state) => state.RestaurantSlice);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const navigation = useNavigation();

  // Sample menu data
  const menuData = [
    {
      id: "1",
      category: "Special Meals",
      title: "Special Rice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      category: "Main Meals",
      title: "Special Rice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "3",
      category: "Drinks",
      title: "Special Juice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "5,500",
      image: "https://via.placeholder.com/100",
    },
    // Add more items for testing
  ];

  const [tabnames, settabnames] = useState("All");

  const restaurantCategories =
    Get__Restaurant_detail_data?.data?.categories || [];
  // const categories = ["All", ...restaurantCategories.map((cat) => cat.name)];

  const filteredMenu =
    activeTab === "All"
      ? menuData
      : menuData.filter((item) => item.category === activeTab);

  useEffect(() => {
    dispatch(Get_single_restaurants(item?.id));
    dispatch(
      Get_All_Menu_Items_For_A_Resturant_Fun({ id: item?.id, categoryId: null })
    );

    return () => {};
  }, []);

  const handleTabChange = (datatab) => {
    // console.log({
    //   peter: datatab,
    // });

    if (datatab?.name === "All") {
      console.log("all");
      settabnames("All");
    } else {
      settabnames(datatab?.name);
    }
    setActiveTab(datatab?.id);

    // Dispatch with the appropriate category_id
    const categoryId = datatab?.name === "All" ? null : datatab?.id;

    dispatch(
      Get_All_Menu_Items_For_A_Resturant_Fun({ id: item?.id, categoryId })
    );
  };

  const categories = [
    { id: "All", name: "All" }, // Adding the "All" tab explicitly
    ...(Get__Restaurant_detail_data?.data?.categories || []),
  ];

  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        {/* Image Header */}
        <Image
          source={{
            uri: Get__Restaurant_detail_data?.data?.restaurant_picture,
          }}
          style={{
            width: "100%",
            height: 200,
          }}
        />

        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.restaurantName}>
            {Get__Restaurant_detail_data?.data?.name}
          </Text>
          <View style={styles.row}>
            <Text style={styles.rating}>⭐ 4.0</Text>
            <Text style={styles.reviews}>(515)</Text>
          </View>
          <View style={{}}>
            <Text style={styles.infoText}>
              Preparation Time: 25 - 35 min FakeData
            </Text>

            <Text style={styles.infoText}>
              Available Delivery Time:{" "}
              {Get__Restaurant_detail_data?.data?.current_opening_hour
                ? `${
                    Get__Restaurant_detail_data?.data?.current_opening_hour
                      ?.day_of_week_label
                  }: ${
                    Get__Restaurant_detail_data?.data?.current_opening_hour
                      ?.is_closed
                      ? "Closed"
                      : `${Get__Restaurant_detail_data?.data?.current_opening_hour?.open_time} - ${Get__Restaurant_detail_data?.data?.current_opening_hour?.close_time}`
                  }`
                : "NA"}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <TextInput style={styles.searchBar} placeholder="Search menu items" />

        {/* Tab Buttons */}
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            paddingHorizontal: 16,
            marginBottom: 16,
            gap: 10,
          }}
        >
          {categories.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeTab === tab.id && styles.activeTabButton,
              ]}
              onPress={() => handleTabChange(tab)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tabnames === "All" ? (
          <>
            {["Special Meals", "Main Meals", "Drinks"].map((category) => (
              <View key={category}>
                {filteredMenu.some((item) => item.category === category) && (
                  <>
                    <Text style={styles.sectionTitle}>
                      {category.toUpperCase()}
                    </Text>
                    {filteredMenu
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <View key={item.id} style={styles.menuItem}>
                          <View style={styles.menuDetails}>
                            <Text style={styles.menuTitle}>{item.title}</Text>
                            <Text style={styles.menuDescription}>
                              {item.description}
                            </Text>
                            <Text style={styles.menuPrice}>{item.price}</Text>
                          </View>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.menuImage}
                          />
                          <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate("FoodDetails")}
                          >
                            <Text style={styles.addButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </>
                )}
              </View>
            ))}
          </>
        ) : (
          <ResturantComponentMenu data={tabnames} />
        )}
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: "#f39c12",
  },
  reviews: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#333",
    marginRight: 16,
  },
  searchBar: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f8f8f8",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  activeTabButton: {
    backgroundColor: "#007bff",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
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
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RestaurantMenuScreen;
