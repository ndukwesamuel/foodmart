import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { PrimaryButton } from "../../components/shared/Button";
import { useNavigation } from "@react-navigation/native";

export default function GetEverythingPage() {
    const navigation = useNavigation();
    const navigationFunc = () => {
        navigation.navigate("CheckoutPage")
    }
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/Foodmart/food.png")} />
        <Pressable
          style={{ position: "absolute", marginTop: 40, paddingHorizontal: 10 }}
        >
          <Image source={require("../../assets/Foodmart/backArrow.png")} />
        </Pressable>
      </View>
      <View style={styles.textArea}>
        <Text style={{ fontSize: 20 }}>Did you Get Everything?</Text>
        <View style={{ gap: 18 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.card}>
              <Image source={require("../../assets/Foodmart/food1.png")} />
              <Text style={styles.cardTitle}>Rice</Text>
              <View>
                <Text style={styles.cardPrice}>5,500</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image source={require("../../assets/Foodmart/food2.png")} />
              <Text style={styles.cardTitle}>Rice</Text>
              <View>
                <Text style={styles.cardPrice}>5,500</Text>
              </View>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.card}>
              <Image source={require("../../assets/Foodmart/food1.png")} />
              <Text style={styles.cardTitle}>Rice</Text>
              <View>
                <Text style={styles.cardPrice}>5,500</Text>
              </View>
            </View>
            <View style={styles.card}>
              <Image source={require("../../assets/Foodmart/food2.png")} />
              <Text style={styles.cardTitle}>Rice</Text>
              <View>
                <Text style={styles.cardPrice}>5,500</Text>
              </View>
            </View>
          </View>
        </View>
        <PrimaryButton buttonText={"Go to Checkout"} action={navigationFunc}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textArea: {
    backgroundColor: "white",
    paddingTop: 32,
    paddingBottom: 24,
    gap: 16,
    paddingHorizontal: 20,
  },
  card: {
    gap: 6,
  },
  cardTitle: {
    color: "#F79B2C",
    fontSize: 19,
  },
  cardPrice:{
    fontSize:16,
    fontWeight:"300"
  }
});
