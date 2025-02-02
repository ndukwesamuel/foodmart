import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { maincolors } from "../../utills/Themes";
import { Formbutton } from "../../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_orders } from "../../Redux/OrderSlice";

export default function DeliveredOrders() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const { Get_all_orders_data } = useSelector((state) => state.OrderSlice);

  useEffect(() => {
    dispatch(Get_all_orders("pending"));

    return () => {};
  }, [dispatch]);


  const navigateFunc = ({item}) => {
    navigation.navigate("MyOrder",{item: item.id});
  };

  return (
    <AppScreen>
      <View style={styles.container}>
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <ReusableTitle data="Delivered Orders" />
        <View style={{ marginTop: 30 }}>
          <DeliveredOrdersComponent
            action={navigateFunc}
            item={Get_all_orders_data?.data}
          />
        </View>
      </View>
    </AppScreen>
  );
}

export const DeliveredOrdersComponent = ({ item , action}) => {
  console.log({ item });
  return (
    <View
      style={{
        paddingHorizontal: 30,
        marginVertical: 20,
      }}
    >
      <FlatList
        data={item}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // paddingHorizontal: 0,
              }}
            >
              <View
                style={{
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 18,
                    color: maincolors.primary,
                  }}
                >
                  {item?.vendor?.name}
                </Text>

                <Text
                  style={{
                    // fontFamily:
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                >
                 X{item?.order_items[0]?.quantity} {item?.order_items[0]?.menu_item?.name}
                </Text>

                <Text
                  style={{
                    // fontFamily:
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                >
                  {item?.total_amount}
                </Text>

                <View>
                  <Formbutton
                    buttonStyle={{
                      backgroundColor: maincolors.primary, // "#4CAF50",
                      paddingVertical: 6,
                      paddingHorizontal: 45,
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    textStyle={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                    icon={
                      <Image
                        source={require("../../assets/Foodmart/Vector3.png")}
                      />
                    }
                    data="Details"
                    onPress={() => action({item})}

                  />
                </View>
              </View>
              <Image
                source={require("../../assets/Foodmart/food.png")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 6,
                }}
              />
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: maincolors.lightgray, //"#C4C4C4",
                marginBottom: 10,
              }}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 20 },
  textArea: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 20,
  },
  line: {
    borderColor: "#9B9B9B4D",
    borderWidth: 1,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#023526",
  },
  option: { fontSize: 16, fontWeight: "300" },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  button: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countContainer: {
    backgroundColor: "#003d32",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  count: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
