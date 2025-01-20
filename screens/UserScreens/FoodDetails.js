import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";
import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import AppScreen from "../../components/shared/AppScreen";
import { maincolors } from "../../utills/Themes";
import { useApiRequest } from "../../hooks/Mutate";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function FoodDetails({ route }) {
  const { item, vendor_id } = route.params;
  console.log({
    emeka: item, // route.params,
  });
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  // console.log({
  //   pppp: user_data?.data,
  // });
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  // const [total, settotal] = useState(second)

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  const navigateFunc = () => {
    let data = {
      quantity: count,
      // vendor_id: vendor_id,
      menu_item_id: item?.id,

      // extra_options: [
      //   {
      //     id: 1,
      //     quantity: 2,
      //   },
      //   // {
      //   //   id: 2,
      //   //   quantity: 2,
      //   // },
      //   // {
      //   //   id: 3,
      //   //   quantity: 2,
      //   // },
      // ],
    };

    console.log({ data: data });

    createCart(data);
  };
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const { mutate: createCart, isLoading: isLoadingCreateCart } = useApiRequest({
    url: `${API_BASEURL}v1/customer/carts`,
    method: "POST",
    token: user_data?.data?.token || "",
    onSuccess: (response) => {
      console.log({
        vvv: response?.data,
      });
      Toast.show({
        type: "success",
        text1: `${response?.data?.message}`,
      });

      // navigation.goBack();
      // console.log("Category created successfully:", response.data);
    },

    onError: (error) => {
      console.log({
        peterkc: error?.response?.data,
      });
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message}`,
      });

      // return;
      // console.error("Category creation failed:", error?.response?.data);
    },
  });

  return (
    <AppScreen>
      <View>
        <Image
          source={
            {
              uri: item?.image,
            }
            // require("../../assets/Foodmart/food.png")
          }
          style={{
            width: "100%",
            height: 250,
          }}
        />

        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.textArea}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "60%", gap: 3 }}>
              <Text style={{ fontSize: 18, color: "#F79B2C" }}>
                {item?.title}
              </Text>
              <Text
                style={{ color: "#686868", fontSize: 12, fontWeight: "300" }}
              >
                {item?.description}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "300" }}>
                {item?.price}
              </Text>
            </View>
            <View>
              <Pressable>
                <Image
                  source={require("../../assets/Foodmart/likeButton.png")}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Required *</Text>
            <View
              style={{
                paddingHorizontal: 10,

                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Takeaway Pack (+500)</Text>

              <TouchableOpacity
                style={{
                  backgroundColor: "#023526",
                  borderRadius: 50,
                  width: 22,
                  height: 22,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("FoodDetails", { itemId: item.id })
                } // Pass item details to the FoodDetails screen
              >
                <Text
                  style={[
                    {
                      color: maincolors.primary,
                      fontSize: 18,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  ✓
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              {
                backgroundColor: "#023526",
                borderRadius: 50,
                width: 22,
                height: 22,
                justifyContent: "center",
                alignItems: "center",
              },
              // isChecked && { backgroundColor: "#007bff" }, // Change style when checked
            ]}
            onPress={toggleCheckbox}
          >
            <Text
              style={[
                {
                  color: maincolors.primary,
                  fontSize: 18,
                  fontWeight: "bold",
                },
                { color: isChecked ? maincolors.primary : "black" }, // Change text color when checked
              ]}
            >
              {isChecked ? "✓" : ""}
            </Text>
          </TouchableOpacity>

          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>
              How many portion would you like?
            </Text>
            <View style={{ paddingHorizontal: 10, gap: 16 }}>
              <Text>1 Portion </Text>
              <Text>2 Portion (+{item?.price})</Text>
              <Text>3 Portion (+{item?.price})</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ gap: 16 }}>
            <Text style={styles.secondaryText}>Select a Protein</Text>
            <View style={{ paddingHorizontal: 10, gap: 16 }}>
              <Text>Chicken</Text>
              <Text>Fish</Text>
              <Text>turkey</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text>Add an Extra Plate</Text>
            <View style={styles.container2}>
              <TouchableOpacity style={styles.button} onPress={decrement}>
                <Text style={styles.buttonText}>-1</Text>
              </TouchableOpacity>
              <View style={styles.countContainer}>
                <Text style={styles.count}>{count}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={increment}>
                <Text style={styles.buttonText}>+1</Text>
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
          </View>

          {isLoadingCreateCart ? (
            <ActivityIndicator size="large" color={maincolors.primary} />
          ) : (
            <PrimaryButton
            buttonText={`Add for ${item?.price && !isNaN(item?.price) ? item.price * count : 0}`}
              action={navigateFunc}
            />
          )}
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
