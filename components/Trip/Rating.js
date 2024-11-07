import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const blueStar = require("../../assets/blue-star.png");
const grayStar = require("../../assets/gray-star.png");
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ReportTripMutation from "../../utills/ReportTripMutation";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Rating({ handleReport }) {
  const { item } = useRoute()?.params;
  const [rating, setRating] = useState(0);
  const stars = [{}, {}, {}, {}, {}];
  const navigation = useNavigation();

  const [comment, setComment] = useState("");

  console.log({
    comment: item?.trip?.routeId?._id,
  });

  const dispatch = useDispatch();
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);

  const ReportTripMutation_Instance = ReportTripMutation(
    user_data?.token,
    dispatch
  );
  console.log({
    rating: rating,
  });

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {/* message */}
      <View style={styles.details}>
        <Text style={{ fontWeight: "900", fontSize: 24, lineHeight: 25.6 }}>
          Arrived Your Destination
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 19.2, color: "#04262F" }}>
          You have gotten to your destination
        </Text>
      </View>
      {/* rating */}
      <View style={{ padding: 10, marginTop: 10, gap: 10 }}>
        <Text>Please rate your ride</Text>

        <View style={{ flexDirection: "row", gap: 5 }}>
          {stars.map((item, index) => {
            // if (rating < index) {
            return (
              <Pressable key={index} onPress={() => setRating(index)}>
                {rating < index ? (
                  <Image key={index} source={grayStar} />
                ) : (
                  <Image key={index} source={blueStar} />
                )}
              </Pressable>
            );
            // } else {
            //   return (
            //     <Pressable onPress={() => setRating(index)}>
            //       <Image key={index} source={blueStar} />
            //     </Pressable>
            //   );
            // }
          })}
        </View>
      </View>

      {/* comment */}
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          // style={{ flex: 1, height: "100%" }}
        >
          {/* <View style={{ flex: 1 }}> */}
          <TextInput
            style={{
              borderWidth: 1,
              // height: "50%",
              // width: "100%",
              height: 400,
              borderColor: "#23488833",
              borderRadius: 12,
              padding: 10,
            }}
            placeholder="Drop a comment"
            textAlignVertical="top"
            multiline
            value={comment}
            blurOnSubmit={true}
            onChangeText={(text) => setComment(text)}
          />
        </TouchableWithoutFeedback>

        {/* action buttons */}
        <View style={{ gap: 10, paddingBottom: 10 }}>
          <Pressable
            onPress={() =>
              ReportTripMutation_Instance.mutate({
                star: rating,
                comment: comment,
                id: item?.trip?.routeId?._id,
              })
            }
            style={{ backgroundColor: "#001272", padding: 10, borderRadius: 8 }}
          >
            {ReportTripMutation_Instance.isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "700",
                  lineHeight: 24.05,
                }}
              >
                Continue
              </Text>
            )}
          </Pressable>
          {/* <Pressable
            onPress={() => handleReport()}
            style={{ padding: 10, borderRadius: 8 }}
          >
            <Text
              style={{
                color: "#001272",
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 24.05,
              }}
            >
              Return to Trip
            </Text>
          </Pressable> */}
        </View>
      </View>

      {/* top buttons */}
      <View style={styles.topBtns}>
        <Pressable
          style={[styles.topBtn, { justifyContent: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Image source={arrowBack} />
        </Pressable>
        <Pressable style={[styles.topBtn, { padding: 3 }]}>
          <Image source={menuBtn} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  map: {
    width: "100%",
    height: "35%",
  },

  topBtns: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  topBtn: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 6,
  },

  details: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: -10,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
});
