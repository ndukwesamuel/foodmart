import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import AvailableBusItems from "./AvailableBusItems";
import AvailableBusItem from "./AvailableBusItem";
import { Get_All_Routes_Fun } from "../../../Redux/Rider/RouteSlice";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");

const AvailableBus = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [modaldata, setModaldata] = useState(null);
  const route = useRoute();
  const data_info = route.params.item;

  const { user_data, user_isLoading } = useSelector((state) => state?.Auth);

  const { Get_All_Routes_data } = useSelector((state) => state?.RouteSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_All_Routes_Fun(data_info)); //

    return () => {};
  }, [dispatch]);

  const toggleModal = (type) => {
    setShowModal(!showModal);
    setModaldata(type);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Set the refreshing state to true
    setRefreshing(true);
    dispatch(Get_All_Routes_Fun()); //

    // Wait for 2 seconds
    setRefreshing(false);
  };

  const sortedTrips = Get_All_Routes_data?.routes
    ? [...Get_All_Routes_data?.routes].sort(
        (a, b) => new Date(b.departureDate) - new Date(a.departureDate)
      )
    : [];

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "space-between",
        padding: 20,
        // borderWidth: 0.5,
        // borderColor: "#D9D9D9",
      }}
    >
      <View style={{ gap: 20, paddingBottom: 100, flex: 1 }}>
        {/* menu and back button */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={arrowBack} />
          </Pressable>
        </View>

        {/* Available Buses */}
        <View style={{ gap: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "900",
              lineHeight: 36,
              color: "#1E0000",
            }}
          >
            Available Buses
          </Text>
        </View>

        {/* list items */}

        <View style={{ flex: 1 }}>
          {sortedTrips?.length > 0 ? (
            <FlatList
              data={sortedTrips}
              renderItem={({ item }) => (
                <AvailableBusItems
                  onShowModal={() => toggleModal(item)}
                  data={item}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 25.6,
                  fontWeight: "500",
                  color: "#1E0000",
                }}
              >
                No Available Buses
              </Text>
            </View>
          )}
        </View>
      </View>
      {showModal && (
        <AvailableBusItem onHideModal={toggleModal} data={modaldata} />
      )}
    </View>
  );
};

export default AvailableBus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  listItems: {
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
