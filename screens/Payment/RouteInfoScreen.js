import { SafeAreaView, StatusBar } from "react-native";
import RouteInfo from "../../components/Payment/RouteInfo/RouteInfo";

const RouteInfoScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <RouteInfo />
    </SafeAreaView>
  );
};

export default RouteInfoScreen;
