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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_favourites } from "../../Redux/OrderSlice";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
const API_BASEURL = "https://foodmart-backend.gigtech.site/api/";

export default function MyFavorite() {
  const dispatch = useDispatch();
  const { Get_all_favourites_data } = useSelector((state) => state?.OrderSlice);
  const { user_data, user_isLoading, user_profile_data } = useSelector(
    (state) => state?.Auth
  );

  useEffect(() => {
    dispatch(Get_all_favourites());

    return () => {};
  }, [dispatch]);
  const navigation = useNavigation();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const navigateFunc = () => {
    navigation.navigate("MyOrder");
  };

  const DeleteFavourite_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/customer/favourites`;
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
        dispatch(Get_all_favourites());
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  return (
    <AppScreen>
      <View style={styles.container}>
        <ReusableBackButton
          style={{ position: "absolute", top: 15, zIndex: 1, left: 20 }}
        />
        <ReusableTitle data="My Favorites" />

        <View
          style={{
            paddingHorizontal: 30,
            marginVertical: 20,
          }}
        >
          <FlatList
            data={Get_all_favourites_data.data}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // paddingHorizontal: 0,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      marginBottom: 20,
                      width: "60%",
                      gap: 10,
                    }}
                  >
                    {/* <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 18,
                        color: maincolors.primary,
                      }}
                    >
                      Restaurant 1
                    </Text> */}

                    <Text
                      style={{
                        // fontFamily:
                        fontWeight: "300",
                        fontSize: 16,
                      }}
                    >
                      {item?.menu_item?.name}
                    </Text>

                    <Text
                      style={{
                        // fontFamily:
                        fontWeight: "300",
                        fontSize: 16,
                      }}
                    >
                      {item?.menu_item?.description}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          // fontFamily:
                          fontWeight: "300",
                          fontSize: 16,
                        }}
                      >
                        {item?.menu_item?.price}
                      </Text>

                      <TouchableOpacity
                        onPress={() =>
                          DeleteFavourite_Mutation.mutate({
                            menu_item_id: item.id,
                          })
                        }
                      >
                        <FontAwesome name="heart" size={24} color="black" />
                      </TouchableOpacity>
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
      </View>
    </AppScreen>
  );
}

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
