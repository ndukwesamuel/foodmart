import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import Success from "./Success";
import Code from "./Code";
const arrowBack = require("../../../assets/arrow-back.png");
const menuBtn = require("../../../assets/menu-button.png");
import { useNavigation } from "@react-navigation/native";

const PayWithCard = () => {
  const navigation = useNavigation();
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState(false);

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
        <Text style={styles.heading}>Pay with Card</Text>

        {/* card details */}
        <View style={{ gap: 20 }}>
          {/* card number */}
          <View style={{ gap: 10 }}>
            <Text style={{ lineHeight: 18.9, fontWeight: "500" }}>
              Card Number
            </Text>
            <TextInput style={styles.input} />
          </View>

          {/* Expiring Date */}
          <View style={{ gap: 10 }}>
            <Text style={{ lineHeight: 18.9, fontWeight: "500" }}>
              Expiring Date
            </Text>
            <TextInput style={styles.input} />
          </View>

          {/* CVV */}
          <View style={{ gap: 10 }}>
            <Text style={{ lineHeight: 18.9, fontWeight: "500" }}>CVV</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>

      <Pressable
        onPress={showSuccessModal}
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

      {/* modals */}
      {success && (
        <Success generateCode={generateCode} closeModal={closeModal} />
      )}
      {code && <Code closeModal={closeModal} />}
    </View>
  );
};

export default PayWithCard;

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

  input: {
    borderWidth: 0.5,
    padding: 8,
    borderColor: "#0000004D",
    borderRadius: 8,
  },
});
