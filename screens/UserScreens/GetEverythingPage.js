import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function GetEverythingPage() {
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
        <Text>Did you Get Everything?</Text>
        <View>
            <View>
                <View>
                    
                </View>
            </View>
        </View>
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
});
