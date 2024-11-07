import { SafeAreaView, StatusBar, View } from "react-native";
import AvailableBus from "../../components/Booking/AvailableBus/AvailableBus";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { TouchableOpacity } from "react-native-gesture-handler";
const AvailabeBusScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <TouchableOpacity
        onPress={() => console.log("uuuuuu")}
        // onPress={() => navigation.toggleDrawer()}
        // style={{ position: "absolute", top: 20, right: 30, zIndex: 1 }}

        style={{ position: "absolute", top: 30, right: 50, zIndex: 100 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <AvailableBus />
      </View>
    </SafeAreaView>
  );
};

export default AvailabeBusScreen;
