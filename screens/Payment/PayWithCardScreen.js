import { SafeAreaView, StatusBar } from "react-native";
import PayWithCard from "../../components/Payment/PaymentType/PayWithCard";

const PayWithCardScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <PayWithCard />
    </SafeAreaView>
  );
};

export default PayWithCardScreen;
