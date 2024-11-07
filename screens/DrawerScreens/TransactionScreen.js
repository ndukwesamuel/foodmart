import { Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import Transactions from "../../components/DrawerComp/Transactions";
const menuBtn = require("../../assets/menu-button.png");

export default function TransactionScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 50, right: 30, zIndex: 1 }}
      >
        <Image source={menuBtn} />
      </TouchableOpacity>
      <Transactions />
    </SafeAreaView>
  );
}
