import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import ModalContainer from "./ModalContainer";
import { locationlist } from "./locationlist";
import { useSelector, useDispatch } from "react-redux";
import { BookATripAction, setBustStop } from "../../../Redux/BookATripSlice";

const BusStop = ({ onCloseModal, main_data }) => {
  const busStop = useSelector((state) => state.BookATripSlice.busStop);
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
          Bus Stop{" "}
          <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: 16.2 }}>
            (your joining point)
          </Text>
        </Text>
        <FlatList
          data={main_data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onCloseModal();
                dispatch(setBustStop(item));
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
                  //   busStop === item.title ? "#001272" : "#F3F3FF"
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

export default BusStop;

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
