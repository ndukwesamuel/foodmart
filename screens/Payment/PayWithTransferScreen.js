import { SafeAreaView, StatusBar } from "react-native";
import PayWithTransfer from "../../components/Payment/PaymentType/PayWithTransfer";

const PayWithTransferScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />
      <PayWithTransfer />
    </SafeAreaView>
  );
};

export default PayWithTransferScreen;
