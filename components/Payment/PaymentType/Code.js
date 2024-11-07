import React from "react";
import Modal from "../../Modal";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
const cancel = require("../../../assets/close-circle.png");
import { useNavigation } from "@react-navigation/native";
const approved = require("../../../assets/approved.png");

const Code = ({ closeModal }) => {
  const navigation = useNavigation();

  return (
    <Modal>
      <View style={styles.container}>
        <Pressable onPress={closeModal}>
          <Image style={{ alignSelf: "flex-end" }} source={cancel} />
        </Pressable>


        <Image
          style={{ alignSelf: "center", width: 65.65, height: 62.76 }}
          source={approved}
        />
        <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 36 }}>
          8826-AB
        </Text>

        {/* error message */}
        <View style={{}}>
          <Text style={{ fontSize: 16, lineHeight: 25.6 }}>
            Thank you so much for choosing us, here is your entry code.
          </Text>
        </View>

        <Text style={{ fontSize: 16, lineHeight: 25.6 }}>
          Your bus leaves by <Text style={{ fontWeight: "500" }}>8:00 AM</Text>
        </Text>

        {/* action button */}
        <Pressable
          onPress={() => navigation.navigate("ongoing-trip")}
          style={styles.actionBtn}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 24.05,
            }}
          >
            Okay
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Code;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 12,
    gap: 10,
  },

  detailsContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    borderColor: "#23488833",
    gap: 10,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionBtn: {
    backgroundColor: "#001272",
    padding: 10,
    borderRadius: 8,
    marginVertical: 30,
    elevation: 5,
  },
});
