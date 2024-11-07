import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import Failed from "./Failed";
import Success from "./Success";
import Code from "./Code";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
const copy = require("../../../assets/copy.png");
import { useNavigation } from "@react-navigation/native";

const PayWithTransfer = () => {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState(false);
  const navigation = useNavigation();

  const showSuccessModal = () => {
    setFailed(false);
    setSuccess(true);
  };

  const closeModal = () => {
    setFailed(false);
    setSuccess(false);
    setCode(false);
  };

  const generateCode = () => {
    setSuccess(false);
    setCode(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
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
          <Pressable>
            <Image source={menuBtn} />
          </Pressable>
        </View>

        {/* heading */}
        <Text style={styles.heading}>Pay with Transfer</Text>

        {/* transfer details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeading}>
            Pay with transfer to this account
          </Text>

          {/* Account number */}
          <View style={styles.itemsContainer}>
            <Text style={styles.detailsText}>Account number</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={[styles.detailsText, { fontWeight: "500" }]}>
                12344241210
              </Text>
              <Pressable
                onPress={() => {
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
                style={styles.copy}
              >
                <Image source={copy} />
                <Text>{copied ? "Copied" : "Copy"}</Text>
              </Pressable>
            </View>
          </View>

          {/* Bank name */}
          <View style={styles.itemsContainer}>
            <Text style={styles.detailsText}>Bank name</Text>
            <Text style={styles.detailsText}>Zenith Bank</Text>
          </View>

          {/* Account name */}
          <View style={styles.itemsContainer}>
            <Text style={styles.detailsText}>Account name</Text>
            <Text style={styles.detailsText}>John mike</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => setFailed(true)}
        style={{
          backgroundColor: "#001272",
          padding: 10,
          borderRadius: 8,
          marginTop: 30,
          elevation: 5,
        }}
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
          Pay ₦800
        </Text>
      </Pressable>

      {failed && (
        <Failed showSuccess={showSuccessModal} closeModal={closeModal} />
      )}
      {success && (
        <Success generateCode={generateCode} closeModal={closeModal} />
      )}
      {code && <Code closeModal={closeModal} />}
    </View>
  );
};

export default PayWithTransfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    gap: 20,
  },

  heading: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "900",
    color: "#1E0000",
  },

  detailsContainer: {
    borderColor: "#23488833",
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    gap: 15,
  },

  detailsHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#04262F",
    lineHeight: 25.6,
  },

  detailsText: {
    fontSize: 16,
    color: "#04262F",
    lineHeight: 25.6,
  },

  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  copy: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#04262F1A",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
