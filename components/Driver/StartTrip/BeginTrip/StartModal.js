import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Modal from "../../../Modal";
const cancelBtn = require("../../../../assets/close-circle.png");
import { useNavigation } from "@react-navigation/native";

export default function StartModal({ onHideModal }) {
  const navigation = useNavigation();
  return (
    <Modal>
      <View style={styles.container}>
        <Pressable onPress={() => onHideModal(false)}>
          <Image
            style={{ alignSelf: "flex-end", height: 24, width: 24 }}
            source={cancelBtn}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            lineHeight: 30.06,
            textAlign: "center",
          }}
        >
          Well Done
        </Text>

        <Text
          style={{
            fontSize: 16,
            lineHeight: 24.05,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          You have 4 more passengers to pick, you can start your trip now
        </Text>

        {/* button */}
        <Pressable
          onPress={() => {
            onHideModal(false);
            setTimeout(() => {
              navigation.navigate("Driver-Ongoing-Trip");
            }, 500);
          }}
          style={{
            alignSelf: "center",
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: "#001272",
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
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
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    borderRadius: 12,
  },
});
