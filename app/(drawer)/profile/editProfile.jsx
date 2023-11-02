import { Fragment, useContext, useEffect, useState } from "react";
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
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { BASE_URL_C } from "../../../global/utils/constantURL";
import { saveData } from "../../../global/services/apis/postApi";
import { colors, fontFamily } from "../../../constants/themeOld";
import { normalize } from "../../../global/utils/dimensions";
import NewCustomTextInput from "../../../components/formFields/newCustomTextInput";
import { COLORS, SIZES, icons, images } from "../../../constants";
import Dropdown from "../../../components/formFields/dropDown";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ContextPrimary } from "../../../global/context/context";
import ButtonCustom from "../../../components/formFields/buttonCustom";
import CustomDropdown from "../../../components/common/dropDown/CustomDropdown";
import CustomDate from "../../../components/common/date/CustomDate";

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

const EditProfile = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    name,
    mobile,
    gender,
    email,
    dateOfBirth,
    maritalStatus,
    height,
    weight,
    emergencyMobile,
    location,
    age,
    avatarUrl,
    patientId,
  } = params;

  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validation

  const validateEmail = (email) => {
    // Regular expression to validate email addresses
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return email === "" || emailRegex.test(email);
  };

  const [formValues, setFormValues] = useState({
    date: dateOfBirth !== "" ? dateOfBirth : "",
    name: name !== "" ? name : "",
    gender: gender !== "" ? gender : "",
    height: height !== "" ? height : "",
    weight: weight !== "" ? weight : "",
    mobile: mobile !== "" ? mobile : "",
    maritalStatus: maritalStatus !== "" ? maritalStatus : "",
    email: email !== "" ? email : "",
    emergencyMobile: emergencyMobile !== "" ? emergencyMobile : "",
    location: location !== "" ? location : "",
    age: age !== "" ? age : "",
  });

  const navigation = useNavigation();
  const [imageSrc, setImageSrc] = useState(avatarUrl ? avatarUrl : icons.camera);
  const [openDate, setOpenDate] = useState(false);

  const marriageStatus = [{ title1: "MARRIED" }, { title1: "UNMARRIED" }];
  const Status = [{ value: "MARRIED" }, { value: "UNMARRIED" }];
  const { changeImg, changeName } = useContext(ContextPrimary);

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

    const url = BASE_URL_C + "patient/profilePic/upload?userId=" + userId;
    console.log({ url1111: url });
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const result = await response.data;
      await AsyncStorage.setItem("AVATAR_URL", result.imageURL);
      setImageSrc(result.imageURL);
      changeImg;
      Alert.alert("Alert", "Successfully Uploaded");
      console.log({ image_upload: result });
    } catch (error) {
      console.error(error);
      Alert.alert("Alert", "Failed to Upload");
    }
  };

  const submitHandler = async (url, payload) => {
    const result = await saveData(url, payload);
    console.log("result payload", result);
    if (result.error) {
      console.error(result.error);
      alert("Falied to Submit.");
    } else {
      console.log({ formValues_afterSubmit: result.data });
      alert("Succefully submited.");
      router.replace("profile");
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
      quality: 0,
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
                quality: 0,
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

  const onPress = async () => {
    if (formValues?.emergencyMobile?.length < 10) {
      ToastAndroid.showWithGravityAndOffset(
        "Enter 10 digit Emergengy Mobile Number",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60
      );
      return;
    } else {
      const url = BASE_URL_C + "patient/userId";
      const userId = await AsyncStorage.getItem("USER_ID");

      const payload = {
        imageURL: imageSrc,
        name: formValues.name,
        dateOfBirth: formValues.date,
        gender: formValues.gender,
        height: formValues.height,
        weight: formValues.weight,
        userId: userId,
        mobile: formValues.mobile,
        gender: formValues.gender,
        emergencyMobile: formValues.emergencyMobile,
        location: formValues.location,
        email: formValues.email,
        maritalStatus: formValues.maritalStatus,
      };
      console.log(payload);
      submitHandler(url, payload);
    }
  };

  const styles = StyleSheet.create({
    profilePic: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      height: imageSrc == icons.camera ? 50 : 85,
      width: imageSrc == icons.camera ? 50 : 85,
      borderRadius: imageSrc == icons.camera ? 0 : 50,
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

  const handleMarriageStatusSelect = (selectedItem) => {
    setFormValues({ ...formValues, maritalStatus: selectedItem.title1 });
    console.log("Selected Item:", selectedItem.title1);
  };
  const handleGenderSelect = (selectedItem) => {
    setFormValues({ ...formValues, gender: selectedItem.title1 });
    console.log("Selected Item:", selectedItem.title1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={styles.profilePic}>
          <View style={styles.avatar}>
            {typeof imageSrc === typeof "" ? (
              <Image source={{ uri: imageSrc }} style={styles.backgroundImage} />
            ) : (
              <Image source={icons.camera} style={styles.backgroundImage} />
            )}
          </View>
          <View
            style={{
              marginLeft: 60,
              marginTop: -15,
              backgroundColor: "#fff",
              borderRadius: 50,
            }}>
            <Pressable style={styles.editButton} onPress={() => captureImage(patientId)}>
              <Image source={icons.edit} style={{ width: 20, height: 20 }} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(22),
            paddingHorizontal: normalize(11),
          }}>
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
              heading="Sender Select"
              data={GenderList}
              formValues={formValues}
              onSelect={handleGenderSelect}
              placeholder="Select Gender"
              borderColor={"#777777"}
              propertyName="gender"
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

          <CustomTextField
            type="mobile"
            heading="Emergency Contact Number"
            placeHolder="Emergency Contact Number"
            value={formValues.emergencyMobile}
            onChangeText={(text) => setFormValues({ ...formValues, emergencyMobile: text })}
          />

          <CustomTextField
            heading="Email"
            placeHolder="Enter email"
            value={formValues.email}
            onChangeText={(text) => {
              setFormValues({ ...formValues, email: text });
              setIsValidEmail(validateEmail(text));
            }}
          />
          {!isValidEmail && (
            <Text style={{ color: "red" }}>Please enter a valid email address</Text>
          )}

          <CustomDropdown
            heading="Marital Status"
            data={marriageStatus}
            formValues={formValues}
            onSelect={handleMarriageStatusSelect}
            placeholder="Select Status"
            borderColor={"#777777"}
            propertyName="maritalStatus"
          />
          <CustomTextField
            heading="Location"
            placeHolder="Enter location"
            value={formValues.location}
            onChangeText={(text) => setFormValues({ ...formValues, location: text })}
          />
        </View>
        <ButtonCustom
          label="Save Profile"
          onPress={onPress}
          style={{ width: normalize(250), marginTop: "5%" }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
