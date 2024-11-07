import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import SelectSeat from "../../components/Booking/Seats/SelectSeat";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
const SelectSeatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />

      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 70, right: 30, zIndex: 1 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <SelectSeat />
    </SafeAreaView>
  );
};

export default SelectSeatScreen;
