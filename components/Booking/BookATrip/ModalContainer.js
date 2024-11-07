import { View, StyleSheet, Pressable } from "react-native";

const ModalContainer = ({ children, onClose }) => {
  return (
    <Pressable
      style={styles.modalContainer}
      onPress={() => onClose && onClose()}
    >
      {children}
    </Pressable>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#00001272",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
