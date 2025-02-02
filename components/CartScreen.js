import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { maincolors } from "../utills/Themes";
import DeliveredOrders, {
  DeliveredOrdersComponent,
} from "../screens/Orders/DeliveredOrders";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_orders } from "../Redux/OrderSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const { Get_All_Cart_data } = useSelector((state) => state.CartSlice);
  const { Get_all_orders_data } = useSelector((state) => state.OrderSlice);
  const [orderStatus, setOrderStatus] = useState("pending");
  // const Get_all_orders_data  = useSelector((state) => state.OrderSlice);
  // console.log({ Get_All_Cart_data: Get_All_Cart_data });
  console.log({
    allOrders: Get_all_orders_data?.data[0].order_items[0].quantity,
  });

  const navigation = useNavigation();

  const handleOrderStatus = (name) => {
    if (name == "pending") {
      settab("ongoing");
    } else {
      settab(name);
    }

    const order = name;
    const body = {
      cart_id: 1,
      use_points: true,
      use_wallet: true,
      address_id: 1,
    };
    dispatch(Get_all_orders("pending"));
  };
  const [tab, settab] = useState("cart");
  useEffect(() => {
    const body = {
      cart_id: 1,
      use_points: true,
      use_wallet: true,
      address_id: 1,
    };
    dispatch(Get_all_orders(orderStatus));

    return () => {};
  }, [dispatch]);

  const renderCartItems = (items) => {
    return (
      <View style={styles.itemContainer}>
        {items?.cart_items.map((cart_item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image
              source={{
                uri: cart_item?.menu_item?.default_image?.original_url,
              }}
              style={styles.itemImage}
            />

            {console.log({
              nvnvnv: cart_item?.menu_item?.default_image?.original_url,
            })}

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{cart_item?.menu_item?.name}</Text>
              <Text style={styles.itemPrice}>
                ₦{cart_item?.menu_item?.price.toLocaleString()}
              </Text>
            </View>

            <Text style={styles.itemQuantity}>x{cart_item.quantity}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderCartSections = ({ item }) => (
    <View style={styles.cartSection}>
      <View style={styles.cartHeader}>
        <Text style={styles.restaurantName}>{item?.vendor?.business_name}</Text>
        <TouchableOpacity>
          <Text style={styles.deleteAll}>Delete All</Text>
        </TouchableOpacity>
      </View>
      {renderCartItems(item)}
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate("CheckoutPage", { item })}
      >
        <Text style={styles.checkoutText}>Continue to checkout</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOngoingSections = ({ item }) => (
    <View
      style={{
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#C4C4C4",
      }}
    >
      <View style={styles.cartHeader}>
        <View>
          <Text style={styles.restaurantName}>{item?.vendor?.name}</Text>
          <Text style={styles.restaurantName}>{item?.total_amount}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.deleteAll}>
            Order ID: {item?.tracking_number}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          marginVertical: 10,
        }}
      />

      <Text>Share this code with your rider</Text>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {[7, 7, 7, 7].map((item) => (
          <View
            style={{
              backgroundColor: "#F4F4F4CC",
              borderRadius: 5,
              padding: 15,
              paddingHorizontal: 20,
            }}
          >
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: maincolors.primary,
          }}
        >
          Track Order
        </Text>
        <SimpleLineIcons
          name="arrow-right"
          size={15}
          color={maincolors.primary}
        />
        <SimpleLineIcons
          name="arrow-right"
          size={15}
          color={maincolors.primary}
        />
      </TouchableOpacity>
    </View>
  );
  const navigateFunc = ({ item }) => {
    navigation.navigate("MyOrder", { item: item.id });
  };
  return (
    <View style={styles.container}>
      {/* Tabs */}

      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => settab("cart")}>
            <Text style={[styles.tab, tab === "cart" && styles.activeTab]}>
              Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOrderStatus("pending")}>
            <Text style={[styles.tab, tab === "ongoing" && styles.activeTab]}>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOrderStatus("delivered")}>
            <Text style={[styles.tab, tab === "delivered" && styles.activeTab]}>
              Delivered
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cart List */}

        {tab === "cart" && (
          <>
            <FlatList
              data={Get_All_Cart_data}
              renderItem={renderCartSections}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

        {tab === "ongoing" && (
          <FlatList
            data={Get_all_orders_data?.data}
            renderItem={renderOngoingSections}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View>
        {tab === "delivered" && (
          <DeliveredOrdersComponent item={Get_all_orders_data?.data} action={navigateFunc}/>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
