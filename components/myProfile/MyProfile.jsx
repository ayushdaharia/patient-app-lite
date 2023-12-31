import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/themeOld";
import { BASE_URL_C } from "../../global/utils/constantURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../../global/services/apis/getApi";
import { icons } from "../../constants";
import { ContextPrimary } from "../../global/context/context";
import { normalize } from "../../global/utils/dimensions";
import { router } from "expo-router";

const MyProfile = ({ patientId }) => {
  const [imageSrc, setImageSrc] = useState(icons.camera);
  const [avatarUrl, setAvatarUrl] = useState("");
  const { changeImg } = useContext(ContextPrimary);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    profilePic: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    avatar: {
      height: 85,
      width: 85,
      backgroundColor: colors.backgroundPrimary,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundImage: {
      height: 85,
      width: 85,
      borderRadius: 50,
    },
    editButton: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
    },
    simpleline: {
      width: "100%",
      borderBottomWidth: 0.5,
      borderColor: "#D1D1D1",
    },
  });

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [emergencyMobile, setEmergencyMobile] = useState("");
  const [location, setLocation] = useState("");
  const [corpName, setCorpName] = useState("");
  const [age, setAge] = useState("");

  const fetchUserData = async () => {
    const userId = await AsyncStorage.getItem("USER_ID");
    const mobile = await AsyncStorage.getItem("MOBILE_NO");
    console.log("userid", userId);
    console.log("MOB", mobile);

    const url = BASE_URL_C + `patient/userId/${userId}?mobile=${mobile}`;
    console.log({ irll111: url });
    const data = await getData(url);
    console.log("fetchDisplayName called with userId:", userId);
    console.log("data received from API:", data);
    if (data.error) {
      console.log({ "error getting user data": data.error });
    } else {
      setAvatarUrl(data?.data?.imageURL);
      setName(data?.data?.name);
      setMobile(data?.data?.mobile);
      setEmail(data?.data?.email);
      setGender(data?.data?.gender);
      setDateOfBirth(data?.data?.dateOfBirth);
      setMaritalStatus(data?.data?.maritalStatus);
      setHeight(data?.data?.height);
      setWeight(data?.data?.weight);
      setEmergencyMobile(data?.data?.emergencyMobile);
      setLocation(data?.data?.location);
      setAge(data?.data?.age);
      setCorpName(data?.data?.corpName);
    }
  };

  useEffect(() => {
    isFocused && fetchUserData();
  }, [isFocused]);

  const selectImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: false,
      });

      if (result.type === "success") {
        const selectedImage = result.assets[0].uri; // Access the first selected asset's URI
        console.log(selectedImage, "image selected");
        uploadFile(selectedImage);
      } else {
        console.log("Image selection was canceled or failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const captureImage = async () => {
    Alert.alert(
      "Alert",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === "granted") {
              const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1,
              });

              if (!image.canceled) {
                const manipulatedImage = await ImageManipulator.manipulateAsync(
                  image.assets[0].uri,
                  [{ resize: { width: 400, height: 500 } }],
                  { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );

                if (manipulatedImage.uri) {
                  uploadFile(manipulatedImage.uri);
                } else {
                  console.log("Image manipulation failed.");
                }
              } else {
                console.log("Camera capture was canceled.");
              }
            } else {
              console.log("Camera permission not granted.");
            }
          },
        },
        {
          text: "Gallery",
          onPress: () => {
            selectImage();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const uploadFile = async (imageUri) => {
    if (!imageUri) {
      console.error("Image URI is undefined or missing.");
      return;
    }

    const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
    const userId = await AsyncStorage.getItem("USER_ID");
    const formData = new FormData();
    const file = {
      uri: imageUri,
      name: imageUri.substring(imageUri.lastIndexOf("/") + 1),
      type: "image/jpeg",
    };
    formData.append("file", file);

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL_C + "patient/profilePic/upload?userId=" + userId,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const result = await response.data;
      await AsyncStorage.setItem("AVATAR_URL", result.imageURL);
      changeImg(result.imageURL);
      setImageSrc({ uri: result.imageURL });
      setAvatarUrl(result.imageURL);
      Alert.alert("Alert", "Successfully Uploaded");
      console.log({ image_upload: result });
      await fetchUserData();
    } catch (error) {
      console.error(error);
      Alert.alert("Alert", "Failed to Upload");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.profilePic}>
        <View style={styles.avatar}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.backgroundImage} />
          ) : (
            <Image source={icons.camera} style={styles.backgroundImage} />
          )}
        </View>
      </View>

      <ScrollView style={{ flex: 1, marginTop: normalize(37) }}>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Name
          </Text>

          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: colors.primary,
              fontWeight: "bold",
            }}>
            {name || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
              // color:colors.primary
            }}>
            Contact Number
          </Text>

          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: mobile ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {mobile || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Email Id
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: email ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {email || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignItems: "center",
          }}>
          <Text
            style={{
              // marginTop: 15,
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Gender
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: gender ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {gender || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Date of Birth
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: dateOfBirth ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {dateOfBirth || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Marital Status
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: maritalStatus ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {maritalStatus || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Height
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: height ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {height || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Weight
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: weight ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {weight || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Emergency Contact Number
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: emergencyMobile ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {emergencyMobile || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            Location
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: location ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {location || "N/A"}
          </Text>
        </View>
        <View style={styles.simpleline}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 12,
            alignContent: "center",
          }}>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 19,
              color: "#B3B3B3",
            }}>
            CorpName
          </Text>
          <Text
            style={{
              fontSize: 18,
              lineHeight: 19,
              color: corpName ? colors.primary : "#B3B3B3",
              fontWeight: "bold",
            }}>
            {corpName || "N/A"}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(drawer)/profile/editProfile",
              params: {
                name,
                age,
                mobile,
                gender,
                email,
                dateOfBirth,
                maritalStatus,
                height,
                weight,
                emergencyMobile,
                location,
                avatarUrl,
                patientId,
              },
            });
          }}>
          <View
            style={{
              //flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 15,
            }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  lineHeight: 23,
                  color: colors.white,
                }}>
                Edit Profile
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;
