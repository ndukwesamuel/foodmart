import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AppScreen from "../components/shared/AppScreen";
import { ReusableBackButton } from "../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../components/shared/Reuseablecomponent";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Get_all_faqs } from "../Redux/OtherSlice";

const FAQs = () => {
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { faq_data } = useSelector((state) => state?.OtherSlice);

  useEffect(() => {
    dispatch(Get_all_faqs());
  }, [dispatch]);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <AppScreen>
      <View style={styles.screenContainer}>
        <ReusableBackButton style={styles.backButton} />
        <View style={styles.titleContainer}>
          <ReusableTitle data="Frequently Asked Questions" />
        </View>

        <FlatList
          data={faq_data?.data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.faqContainer}
          renderItem={({ item, index }) => (
            <View>
              <TouchableOpacity
                style={styles.faqItem}
                onPress={() => toggleExpand(index)}
              >
                <Text style={styles.faqQuestion}>{item?.question}</Text>
                <AntDesign
                  name={expandedIndex === index ? "up" : "down"}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {expandedIndex === index && (
                <Text style={styles.faqAnswer}>{item?.answer}</Text>
              )}
            </View>
          )}
        />
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 15,
    zIndex: 1,
    left: 20,
  },
  titleContainer: {
    width: "60%",
    alignSelf: "center",
  },
  faqContainer: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default FAQs;
