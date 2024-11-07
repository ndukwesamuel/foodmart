import React from "react";
import Modal from "../../Modal";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
const cancel = require("../../../assets/close-circle.png");
const approved = require("../../../assets/approved.png");

const Success = ({ generateCode, closeModal }) => {
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

        {/* error message */}
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 24,
              lineHeight: 36,
              fontWeight: "700",
              color: "#1E0000",
              textAlign: "center",
            }}
          >
            ₦700
          </Text>
          <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 25.6 }}>
            Your payment successful, kindly generate your unique code
          </Text>
        </View>

        {/* action button */}
        <Pressable onPress={() => generateCode()} style={styles.actionBtn}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 24.05,
            }}
          >
            Generate Code
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Success;

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
