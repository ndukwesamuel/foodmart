import { StatusBar, SafeAreaView, Text } from "react-native";
import StartATrip from "../../../components/Driver/StartTrip/StartATrip";

const StartATripScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <StartATrip />
    </SafeAreaView>
  );
};

export default StartATripScreen;
