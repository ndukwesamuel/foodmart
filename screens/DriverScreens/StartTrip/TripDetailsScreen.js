import { StatusBar, SafeAreaView } from "react-native";
import TripDetails from "../../../components/Driver/StartTrip/TripDetails/TripDetails";

const TripDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <TripDetails />
    </SafeAreaView>
  );
};

export default TripDetailsScreen;
