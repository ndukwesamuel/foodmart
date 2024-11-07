import React from "react";
import Modal from "../../Modal";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
const cancel = require("../../../assets/close-circle.png");
const error = require("../../../assets/error.png");

const Failed = ({ showSuccess, closeModal }) => {
  return (
    <Modal>
      <View style={styles.container}>
        <Pressable onPress={closeModal}>
          <Image style={{ alignSelf: "flex-end" }} source={cancel} />
        </Pressable>
        <Image
          style={{ alignSelf: "center", width: 65.65, height: 62.76 }}
          source={error}
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
            Payment not successful
          </Text>
          <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 25.6 }}>
            Please try again
          </Text>
        </View>

        {/* payment details */}
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 16, fontWeight: "500", lineHeight: 25.6 }}>
            Pay with transfer to this account
          </Text>

          {/* account number */}
          <View style={styles.details}>
            <Text style={{ fontSize: 16, lineHeight: 25.6, opacity: 0.6 }}>
              Account number
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>12344241210</Text>
          </View>

          {/* Bank name */}
          <View style={styles.details}>
            <Text style={{ fontSize: 16, lineHeight: 25.6, opacity: 0.6 }}>
              Bank name
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 25.6, opacity: 0.6 }}>
              Zenith Bank
            </Text>
          </View>

          {/* Account name */}
          <View style={styles.details}>
            <Text style={{ fontSize: 16, lineHeight: 25.6, opacity: 0.6 }}>
              Account name
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 25.6, opacity: 0.6 }}>
              John mike
            </Text>
          </View>
        </View>

        {/* action button */}
        <Pressable onPress={showSuccess} style={styles.actionBtn}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
              lineHeight: 24.05,
            }}
          >
            Confirm Payment
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Failed;

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
