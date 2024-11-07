import { View, Text, SafeAreaView, StatusBar } from "react-native";
import SelectedRoute from "../../components/Booking/route/SelectedRoute";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { TouchableOpacity } from "react-native-gesture-handler";
const SelectedRouteScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "relative", top: 10, right: 60, zIndex: 100 }}
      >
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <SelectedRoute />
    </SafeAreaView>
  );
};

export default SelectedRouteScreen;
