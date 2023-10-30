import { useState, useContext } from "react";
import axios from "axios";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { BASE_URL_C } from "../global/utils/constantURL";
import { saveData } from "../global/services/apis/postApi";
import { useRouter } from "expo-router/src/hooks";
import { normalize } from "../global/utils/dimensions";
import { COLORS, SIZES, icons, images } from "../constants";
import ButtonCustom from "../components/formFields/buttonCustom";
import { useLocalSearchParams } from "expo-router";
import { ContextPrimary } from "../global/context/context";
import { colors, fontFamily } from "../constants/themeOld";
import { TextInput } from "react-native-gesture-handler";
import CustomDate from "../components/common/date/CustomDate";
import CustomDropdown from "../components/common/dropDown/CustomDropdown";

const CustomTextField = ({ heading, placeHolder, value, onChangeText, width, unit, type }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{heading}</Text>
      <View
        style={{
          width: width,
          flexDirection: "row",
          alignItems: "center",
          borderColor: COLORS.gray,
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 5,
        }}>
        {type === "mobile" ? (
          <View style={{ flexDirection: "row" }}>
            <Image source={images.flag} style={{ width: 30, height: 20, marginHorizontal: 10 }} />
            <View style={{ borderRightWidth: 0.5, height: 20, borderColor: COLORS.gray }}></View>
          </View>
        ) : null}

        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={COLORS.gray}
          style={{
            height: 40,
            padding: 10,

            flex: 1,
          }}
          value={value}
          onChangeText={onChangeText}
          keyboardType={type === "mobile" ? "numeric" : "default"} // Set keyboardType to numeric for mobile type
          maxLength={type === "mobile" ? 10 : undefined} // Set maxLength to 10 for mobile type
        />
        <Text style={{ fontSize: SIZES.small, paddingRight: 10 }}>{unit}</Text>
      </View>
    </View>
  );
};

const SetupProfile = ({ familyId = "", patientId }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { mobile, employee } = params;

  console.log({ mobile, employee });

  console.log({ employee_data12345: employee });
  console.log({ mobile_data123: mobile });
  const [formValues, setFormValues] = useState({
    // date: new Date(),
    date: employee?.dateOfBirth
      ? new Date(employee?.dateOfBirth).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    name: employee?.name || "",
    gender: employee?.gender || "",
    height: employee?.height || "",
    weight: employee?.weight || "",
    mobile: mobile || "",
  });

  console.log({ formValues_4321: formValues });

  const navigation = useNavigation();
  const [imageSrc, setImageSrc] = useState(icons.cameraIcon);
  const [avatarUrl, setAvatarUrl] = useState("");
  const { changeImg } = useContext(ContextPrimary);
  const [openDate, setOpenDate] = useState(false);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Gallery permission not granted.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      console.log(selectedImage, "image selected");
      uploadFile(selectedImage);
    } else {
      console.log("Image selection was canceled.");
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
                  [{ resize: { width: 400, height: 600 } }],
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
      setImageSrc({ uri: result.imageURL });
      Alert.alert("Alert", "Successfully Uploaded");
      console.log({ image_upload: result });
    } catch (error) {
      console.error(error);
      Alert.alert("Alert", "Failed to Upload");
    }
  };

  const submitHandler = async () => {
    const url = BASE_URL_C + "patient/userId";
    const userId = await AsyncStorage.getItem("USER_ID");
    const payload = {
      name: formValues.name,
      dateOfBirth: formValues.date,
      gender: formValues.gender,
      height: formValues.height,
      weight: formValues.weight,
      userId: userId,
      mobile: formValues.mobile,
    };

    console.log("payload", payload);
    const result = await saveData(url, payload);
    console.log("result payload", result);
    if (result.error) {
      console.error(result.error);
      Alert.alert("Falied to Submit.");
    } else {
      console.log({ formValues_afterSubmit: result.data });
      Alert.alert("Succefully submited.");
      router.replace("home");
      setFormValues({
        date: null,
        name: "",
        gender: "",
        height: "",
        weight: "",
        mobile: "",
      });
    }
  };

  const onPress = async () => {
    if (formValues.name === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Enter a valid Name",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60
      );
      return;
    } else if (formValues.gender === "") {
      ToastAndroid.showWithGravityAndOffset(
        "Select a valid Gender",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60
      );
      return;
    } else {
      submitHandler();
    }
  };

  const styles = StyleSheet.create({
    profilePic: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    avatar: {
      height: 90,
      width: 90,
      backgroundColor: colors.backgroundPrimary,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backgroundImage: {
      height: imageSrc == icons.cameraIcon ? 50 : 85,
      width: imageSrc == icons.cameraIcon ? 50 : 85,
      borderRadius: imageSrc == icons.cameraIcon ? 0 : 50,
    },
    editButton: {
      width: 35,
      height: 35,
      borderWidth: 0.8,
      borderColor: colors.primary,
      borderRadius: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    genderButton: {
      // width: 70,
      height: 35,
      backgroundColor: colors.backgroundPrimary,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 11,
    },
    genderText: {
      color: "#6B6B6B",
      fontFamily: fontFamily.primary,
      fontSize: 16,
      // lineHeight: 20,
    },
    activeText: {
      color: colors.primary,
      fontFamily: fontFamily.primary,
      fontSize: 16,
      // lineHeight: 17,
    },
    unitButton: {
      height: 20,
      width: 40,
      borderRadius: 20,
      backgroundColor: colors.backgroundPrimary,
      marginLeft: "80%",
      marginTop: -30,
    },
    activeGenderShadow: {
      shadowColor: "#127DDD",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,

      elevation: 5,
    },
  });

  const GenderList = [{ title1: "MALE" }, { title1: "FEMALE" }, { title1: "OTHER" }];
  const handleItemSelect = (selectedItem) => {
    setFormValues({ ...formValues, gender: selectedItem.title1 });
    console.log("Selected Item:", selectedItem.title1);
  };

  console.log({ employee });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.profilePic}>
        <View style={styles.avatar}>
          {employee?.imageURL ? (
            <Image src={employee?.imageURL} style={styles.backgroundImage} />
          ) : (
            <Image source={imageSrc} style={styles.backgroundImage} />
          )}
        </View>
        <View
          style={{
            marginLeft: 60,
            marginTop: -25,
            backgroundColor: "#fff",
            borderRadius: 50,
          }}>
          <Pressable style={styles.editButton} onPress={() => captureImage(patientId)}>
            <Image source={icons.edit} style={{ width: 20, height: 20 }} />
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: 50, marginHorizontal: 20 }}>
          <CustomTextField
            heading="Name"
            width={"100%"}
            placeHolder="Enter Name"
            value={formValues.name}
            onChangeText={(text) => setFormValues({ ...formValues, name: text })}
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <CustomDate
              heading="Date of Birth"
              formValues={formValues} // Use formValues, not date
              setFormValues={setFormValues}
              propertyName="date" // Specify the property name
            />
            <CustomDropdown
              heading="Gender"
              data={GenderList}
              onSelect={handleItemSelect}
              placeholder="Select Gender"
            />
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <CustomTextField
              heading="Weight"
              placeHolder="Enter Weight"
              value={formValues.weight}
              onChangeText={(text) => setFormValues({ ...formValues, weight: text })}
              unit="cm"
            />
            <CustomTextField
              heading="Height"
              placeHolder="Enter Height"
              value={formValues.height}
              onChangeText={(text) => setFormValues({ ...formValues, height: text })}
              unit="kg"
            />
          </View>
          <CustomTextField
            type="mobile"
            heading="Phone Number"
            placeHolder="Enter Phone Number"
            value={formValues.mobile}
            onChangeText={(text) => setFormValues({ ...formValues, mobile: text })}
          />
        </View>
        <ButtonCustom
          label="Submit"
          onPress={onPress}
          style={{ width: normalize(250), marginTop: "30%" }}
        />

        <Pressable
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => router.replace("home")}>
          <View>
            <Text style={{ color: "red", fontSize: 16 }}>Skip</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SetupProfile;
