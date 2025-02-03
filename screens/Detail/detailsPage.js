import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import { UserProfile_Fun } from "../../Redux/AuthSlice";
import axios from "axios";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const DetailsPage = () => {
  const dispatch = useDispatch();
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    user_profile_data?.data?.date_of_birth
      ? new Date(user_profile_data?.data?.date_of_birth)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user_data } = useSelector((state) => state?.Auth);
  const { user_profile_data } = useSelector((state) => state?.Auth);
  console.log({ profile: user_profile_data?.data });

  useEffect(() => {
    if (user_profile_data?.data) {
      setName(user_profile_data.data.name || "");
      setEmail(user_profile_data.data.email || "");
      setMobileNumber(user_profile_data.data.mobile_number || "");
      setOccupation(user_profile_data.data.occupation || "");
      setHobbies(user_profile_data.data.hobbies || "");
      setGender(user_profile_data.data.gender || "");
      setDateOfBirth(
        user_profile_data.data.date_of_birth
          ? new Date(user_profile_data.data.date_of_birth)
          : new Date()
      );
    }
  }, [user_profile_data]);

  const openGenderModal = () => {
    setGenderModalVisible(true);
  };

  const selectGender = (option) => {
    setGender(option);
    setGenderModalVisible(false);
  };

  const onChangeDOB = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(); // Format the date to a readable string
  };

  const handleEditMode = () => {
    setIsDisabled(!isDisabled);
  };

  const UpdateProfile_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}v1/profile`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          text1: `${success?.data?.message}`,
        });
        dispatch(UserProfile_Fun());
        setIsDisabled(true);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const handleUpdateProfile = () => {
    const data = {
      name: name,
      email: email,
      mobile_number: mobileNumber,
      date_of_birth: formatDate(dateOfBirth),
      gender: gender,
      occupation: occupation,
      hobbies: hobbies,
      additional_number: "",
    };
    UpdateProfile_Mutation.mutate(data);
  };

  return (
    <View
      style={{
        paddingTop: "13%",
        paddingHorizontal: "5%",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <ReusableBackButton />
        <ReusableTitle data={"My Details"} />
        {isDisabled ? (
          <TouchableOpacity onPress={handleEditMode}>
            <Text style={{ color: "red" }}>Edit</Text>
          </TouchableOpacity>
        ) : UpdateProfile_Mutation.isLoading ? (
          <ActivityIndicator size={"small"} color={"green"} />
        ) : (
          <TouchableOpacity onPress={handleUpdateProfile}>
            <Text style={{ color: "green" }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ paddingTop: "13%" }}>
        <Text>Full Name</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          editable={!isDisabled}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          editable={!isDisabled}
          value={email}
          onChangeText={setEmail}
        />
        <Text>Mobile Number</Text>
        <TextInput
          style={styles.FormTextInput("100%")}
          editable={!isDisabled}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <View style={styles.SubContainerForFormTextInput}>
          <Pressable
            style={[styles.selectBox]}
            onPress={openGenderModal}
            disabled={isDisabled}
          >
            <Text>Gender (optional)</Text>
            <Text style={styles.FormTextInput("100%")}>
              {gender || "Select Gender"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.selectBox]}
            onPress={() => !isDisabled && setShowDatePicker(true)}
            disabled={isDisabled}
          >
            <Text>Date of Birth (optional)</Text>
            <Text style={styles.FormTextInput("100%")}>
              {formatDate(dateOfBirth)}
            </Text>
          </Pressable>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onChangeDOB}
          />
        )}
        <View style={styles.SubContainerForFormTextInput}>
          <View style={styles.SubContainer}>
            <Text>Occupation (optional)</Text>
            <TextInput
              style={styles.textInput}
              editable={!isDisabled}
              value={occupation}
              onChangeText={setOccupation}
            />
          </View>
          <View style={styles.SubContainer}>
            <Text>Hobbies (optional)</Text>
            <TextInput
              style={styles.textInput}
              editable={!isDisabled}
              value={hobbies}
              onChangeText={setHobbies}
            />
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={isGenderModalVisible}
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select Gender</Text>
              {["male", "female"].map((option) => (
                <Pressable
                  key={option}
                  onPress={() => selectGender(option)}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  FormTextInput: (width) => ({
    height: 40,
    width: width,
    borderWidth: 2,
    borderColor: "#F4F4F4",
    borderRadius: 4,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  }),
  SubContainerForFormTextInput: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  SubContainer: {
    width: "45%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 10,
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#F4F4F4",
    padding: 10,
    borderRadius: 4,
  },
  selectBox: {
    width: "45%",
    paddingVertical: 10,
  },
});

export default DetailsPage;
