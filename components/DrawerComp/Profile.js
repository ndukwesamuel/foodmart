import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Touchable,
  TouchableOpacity,
  Button,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const profile = require("../../assets/profile-picture.png");
const arrowRight = require("../../assets/arrow-left.png");
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { UserProfile_Fun } from "../../Redux/AuthSlice";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import ReuseModals from "../shared/ReuseModals";
import UpdateProfileMutation from "../../utills/UpdateProfileMutation";

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user_profile_data } = useSelector((state) => state?.Auth);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    dispatch(UserProfile_Fun());

    return () => {};
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* profile picture container */}
      <View style={styles.pictureContainer}>
        <View style={{ alignItems: "center", gap: 10 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 24,
              lineHeight: 36,
              color: "#1E0000",
            }}
          >
            Profile
          </Text>
          <View
            style={{ backgroundColor: "white", padding: 10, borderRadius: 12 }}
          >
            <Image
              style={{ width: 118, height: 89 }}
              source={{
                uri: user_profile_data?.userProfile?.image,
              }}
            />
          </View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              lineHeight: 21.6,
              color: "#04262F",
            }}
          >
            {`${user_profile_data?.userProfile?.userId?.userName}  ${user_profile_data?.userProfile?.userId?.lastName}`}
          </Text>
        </View>
      </View>

      {/* profile details container */}
      <View style={{ padding: 10, gap: 10 }}>
        {/* name */}
        <Pressable
          onPress={() => navigation.navigate("Notification")}
          style={styles.itemContainer}
        >
          <View>
            <Text style={styles.primaryText}>Name</Text>
            <Text style={styles.secondaryText}>
              {`${user_profile_data?.userProfile?.userId?.userName}  ${user_profile_data?.userProfile?.userId?.lastName}`}
            </Text>
          </View>
          <Image style={{ height: 16, width: 16 }} source={arrowRight} />
        </Pressable>

        {/* Phone Number */}
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.primaryText}>Phone Number</Text>
            <Text style={styles.secondaryText}>
              {user_profile_data?.userProfile?.userId?.phoneNumber}
            </Text>
          </View>
          <Image style={{ height: 16, width: 16 }} source={arrowRight} />
        </View>

        {/* Email Address */}
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.primaryText}>Email Address</Text>
            <Text style={styles.secondaryText}>
              {user_profile_data?.userProfile?.userId?.email}
            </Text>
          </View>
          <Image style={{ height: 16, width: 16 }} source={arrowRight} />
        </View>

        {/* Home Location */}
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.primaryText}>Home Location</Text>
            <Text style={styles.secondaryText}>
              {user_profile_data?.userProfile?.homeLocation}
            </Text>
          </View>
          <Image style={{ height: 16, width: 16 }} source={arrowRight} />
        </View>

        <TouchableOpacity
          onPress={() => setUpdateModal(!updateModal)}
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
            width: 50,
            height: 50,

            position: "relative",
            top: 80,
            left: 300,
            zIndex: 100,
          }}
        >
          <Entypo name="edit" size={24} color="black" />
        </TouchableOpacity>

        <ReuseModals visible={updateModal}>
          <UpdateScreen
            setUpdateModal={setUpdateModal}
            updateModal={updateModal}
          />
        </ReuseModals>
      </View>
    </View>
  );
}

function UpdateScreen({ setUpdateModal, updateModal }) {
  const { user_profile_data, user_data } = useSelector((state) => state?.Auth);

  // let userProfile_data;
  const [image, setImage] = useState(user_profile_data?.userProfile?.image);

  const [userName, setUserName] = useState(
    user_profile_data?.userProfile?.userId?.userName || ""
  );
  const [lastName, setLastName] = useState(
    user_profile_data?.userProfile?.userId?.lastName || ""
  );
  const [homeLocation, setHomeLocation] = useState(
    user_profile_data?.userProfile?.homeLocation || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    user_profile_data?.userProfile?.userId?.phoneNumber || ""
  );

  const UpdateProfileMutation_Instance = UpdateProfileMutation(
    user_data.token
    // item
  );

  const handleUpdate = () => {
    // Perform update logic here, like sending data to a server
    console.log("Updated data:", {
      userName,
      lastName,
      homeLocation,
      phoneNumber,
      image,
    });
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("lastName", lastName);
    formData.append("homeLocation", homeLocation);
    formData.append("phoneNumber", phoneNumber);

    if (image) {
      const uri = image;
      const type = "image/jpeg"; // Adjust the type based on the file type
      const name = "photo.jpg"; // Adjust the name as needed
      formData.append("image", { uri, type, name });
    }

    UpdateProfileMutation_Instance.mutate(formData);

    // UpdateProfileMutation_Instance.mutate({
    //   userName,
    //   lastName,
    //   homeLocation,
    //   phoneNumber,
    // });
    // You can add your logic to send this data to your backend or perform any other operations
  };

  // Replace with the user's actual data

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 2,
      }}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        // onPress={() => navigation.toggleDrawer()}
        onPress={() => setUpdateModal(!updateModal)}
        style={{
          // backgroundColor: "white",
          padding: 10,
          borderRadius: 50,
          width: 50,
          height: 50,

          position: "absolute",
          top: 1,
          right: 0,
          zIndex: 1,
        }}
      >
        <MaterialIcons name="cancel" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pickImage}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}>
        First Name
      </Text>

      <TextInput
        style={{
          height: 40,
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Username"
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />

      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}>
        last Name
      </Text>
      <TextInput
        style={{
          height: 40,
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}>
        Home Location
      </Text>
      <TextInput
        style={{
          height: 40,
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Home Location"
        value={homeLocation}
        onChangeText={(text) => setHomeLocation(text)}
      />

      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 5 }}>
        Phone Number
      </Text>
      <TextInput
        style={{
          height: 40,
          width: "100%",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      {/* <Button title="Update" onPress={handleUpdate} /> */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {UpdateProfileMutation_Instance.isLoading ? (
          <ActivityIndicator size="large" color="#001272" />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#001272",
              padding: 10,
              borderRadius: 10,
              width: "50%",
            }}
            onPress={handleUpdate}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pictureContainer: {
    height: "30%",
    backgroundColor: "#E1F5FE",
    justifyContent: "center",
    alignItems: "center",
  },

  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  primaryText: { fontSize: 12, lineHeight: 19.2, color: "#37565E" },

  secondaryText: { fontWeight: "500", lineHeight: 18.9, color: "#04262F" },
});
