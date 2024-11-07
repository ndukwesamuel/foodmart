import { StatusBar, SafeAreaView, Text } from "react-native";
import DriverHome from "../../../components/Driver/DriverHome/DriverHome";

const DriverHomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <DriverHome />
    </SafeAreaView>
  );
};

export default DriverHomeScreen;
