import { StatusBar, SafeAreaView, Text } from "react-native";
import AvailableRoute from "../../../components/Driver/StartTrip/AvailableRoute/AvailableRoute";

const AvailableRouteScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <AvailableRoute />
    </SafeAreaView>
  );
};

export default AvailableRouteScreen;
