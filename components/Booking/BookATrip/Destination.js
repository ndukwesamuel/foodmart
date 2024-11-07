import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import ModalContainer from "./ModalContainer";
import { locationlist } from "./locationlist";
import { useDispatch, useSelector } from "react-redux";
import { BookATripAction, setDestination } from "../../../Redux/BookATripSlice";

const Destination = ({ onCloseModal, main_data }) => {
  const destination = useSelector((state) => state.BookATripSlice.destination);
  const dispatch = useDispatch();

  return (
    <ModalContainer onClose={onCloseModal}>
      <View style={styles.listContainer}>
        <Text
          style={{
            fontWeight: "500",
            lineHeight: 18.9,
            color: "#1E0000",
          }}
        >
          Destination{" "}
          <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: 16.2 }}>
            (your alighting bus stop)
          </Text>
        </Text>
        <FlatList
          data={main_data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onCloseModal();
                dispatch(setDestination(item));
              }}
              style={styles.listItems}
            >
              <View
                style={{
                  borderWidth: 0.5,
                  height: 10,
                  width: 10,
                  borderRadius: 10,
                  borderColor: "#234888",
                  // backgroundColor: `${
                  //   destination === item.title ? "#001272" : "#F3F3FF"
                  // }`,
                }}
              ></View>
              {/* <Text item={item}>{item.title}</Text> */}

              <View style={{ gap: 5, flexDirection: "row" }}>
                <Text>{item.LGA},</Text>
                <Text>{item.name}</Text>
              </View>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ModalContainer>
  );
};

export default Destination;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F3F3FF",
    width: "90%",
    height: "40%",
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },

  fletlist: {
    gap: 10,
  },

  listItems: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#234888",
    padding: 10,
  },
});
