import { SafeAreaView, StatusBar } from "react-native";
import PaymentType from "../../components/Payment/PaymentType/PaymentType";

const PaymentTypeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <PaymentType />
    </SafeAreaView>
  );
};

export default PaymentTypeScreen;
