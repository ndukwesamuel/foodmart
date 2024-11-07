import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
const arrowBack = require("../../assets/arrow-back.png");
const menuBtn = require("../../assets/menu-button.png");
const cancelBtn = require("../../assets/close-circle.png");
import { useNavigation } from "@react-navigation/native";
import Modal from "../Modal";
import { useState } from "react";

export default function Notification() {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);

  const notificationsData = [{}, {}, {}, {}, {}];

  return (
    <View style={styles.container}>
      {/* menu and back button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={arrowBack} />
        </Pressable>
        <Pressable>
          <Image source={menuBtn} />
        </Pressable>
      </View>

      {/* heading */}
      <Text style={styles.heading}>Notification</Text>

      {/* notifications */}
      <FlatList
        data={notificationsData}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setModal(true)}
            style={{
              borderBottomWidth: 1,
              paddingTop: 10,
              borderColor: "#D1E1F5",
            }}
          >
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  color: "#04262F",
                  fontWeight: "500",
                  lineHeight: 18.9,
                }}
              >
                Your Trip starts In 8minutes
              </Text>
              <Text
                style={{ color: "#37565E", fontSize: 12, lineHeight: 19.2 }}
              >
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation
              </Text>
            </View>
          </Pressable>
        )}
        // keyExtractor={(item) => item.id.toString()}
      />
      {modal && (
        <Modal>
          <Pressable
            onPress={() => {
              setModal(false);
              setTimeout(() => {
                navigation.navigate("Transaction");
              }, 500);
            }}
            style={{
              backgroundColor: "white",
              width: "90%",
              borderRadius: 12,
              padding: 10,
              zIndex: 5,
              // gap: 10,
            }}
          >
            <Pressable
              onPress={() => setModal(false)}
              style={{ alignSelf: "flex-end", zIndex: 10 }}
            >
              <Image source={cancelBtn} />
            </Pressable>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 21.6,
                color: "#04262F",
                marginBottom: 10,
              }}
            >
              Your Trip starts In 8 minutes
            </Text>
            <Text style={{ fontSize: 12, lineHeight: 19.2, color: "#37565E" }}>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation consectetur adipiscing elit, sed do eiusmod
              tempor inci
            </Text>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    gap: 10,
  },

  heading: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1E0000",
    paddingHorizontal: 10,
  },
});
