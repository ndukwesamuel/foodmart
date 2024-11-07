import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import ModalContainer from "./ModalContainer";
import { timelist } from "./timelist";
import { useDispatch, useSelector } from "react-redux";
import { BookATripAction, setLeaveTime } from "../../../Redux/BookATripSlice";

const DepartureTime = ({ onCloseModal, main_data }) => {
  const time = useSelector((state) => state.BookATripSlice.time);
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
          Departure Time
        </Text>
        <FlatList
          data={main_data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onCloseModal();
                dispatch(setLeaveTime(item));
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
                  //   time === item.title ? "#001272" : "#F3F3FF"
                  // }`,
                }}
              ></View>
              <Text>{item}</Text>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ModalContainer>
  );
};

export default DepartureTime;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#F3F3FF",
    width: "90%",
    height: "40%",
    borderRadius: 10,
    padding: 10,
    gap: 10,
    zIndex: 20,
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
