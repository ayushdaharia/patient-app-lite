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
import { icons, images } from "../../../constants";
import Dropdown from "../../../components/formFields/dropDown";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ContextPrimary } from "../../../global/context/context";
import ButtonCustom from "../../../components/formFields/buttonCustom";
import CustomDropdown from "../../../components/common/dropDown/CustomDropdown";
import CustomDate from "../../../components/common/date/CustomDate";

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
  const { changeImg } = useContext(ContextPrimary);

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

      setImageSrc(result.imageURL);

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
      // console.log("my userid", userId);

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
      // console.log("payload", payload);
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

  // console.log({ formValues: formValues });
  const handlePress = () => {
    setOpenDate(true);
  };
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
          <NewCustomTextInput
            label="Name"
            placeholder="Enter name"
            value={formValues.name}
            onChangeText={(text) => {
              setFormValues({ ...formValues, name: text });
            }}
          />

          <View style={{ flexDirection: "row", gap: 10, marginTop: normalize(17) }}>
            <CustomDate
              heading="Date of Birth"
              formValues={formValues} // Use formValues, not date
              setFormValues={setFormValues}
              propertyName="date" // Specify the property name
              borderRadius={5}
              height={44}
              headingColor="#777777"
            />
            <CustomDropdown
              heading="Sender Select"
              data={GenderList}
              onSelect={handleGenderSelect}
              placeholder="Select Gender"
              borderRadius={5}
              height={44}
              color={"#127DDD"}
              selectedItemColor={"#777777"}
              headingColor={"#777777"}
            />
          </View>

          {/* 
          <View
            style={{
              flexDirection: "row",
              marginTop: normalize(17),
              width: "100%",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginRight: normalize(36),
              }}>
              <View style={{ marginRight: normalize(36) }}>
                <Text style={{ color: "#777777" }}>Date of Birth</Text>
                <Pressable
                  onPress={handlePress}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 0.5,
                    paddingVertical: normalize(6),
                    paddingHorizontal: normalize(9),
                    marginTop: normalize(6),
                    borderRadius: 5,
                    width: normalize(154),
                  }}>
                  <DatePicker
                    modal
                    open={openDate}
                    onConfirm={(date) => {
                      setOpenDate(false);
                      let newdate = moment(date).format("YYYY-MM-DD");
                      // console.log("dddd", date);
                      setFormValues({ ...formValues, date: newdate });
                      // formValues["date"] = date;
                    }}
                    onCancel={() => {
                      setOpenDate(false);
                    }}
                    textColor="#208F94"
                    androidVariant="nativeAndroid"
                    mode={"date"}
                    date={new Date()}
                    // isVisible={datePickerVisible}
                  />
                  <Text style={{ color: "#777777" }}>{formValues?.date}</Text>
                  <Image
                    style={{
                      height: normalize(30),
                      width: normalize(30),
                      tintColor: "#404040",
                      marginLeft: normalize(30),
                    }}
                    source={icons.calendarBlue}
                  />
                </Pressable>
              </View>
              <View>
               <Text style={{ color: "#777777" }}>Gender</Text> 
                 <Dropdown
                  options={GenderList}
                  selectedOption={formValues.gender}
                  onOptionSelect={(gender) => {
                    setFormValues({ ...formValues, gender });
                  }}
                  defaultOption="Select Gender"
                  ContainerStyle={{
                    width: normalize(160),
                    borderColor: "#404040",
                    borderWidth: 0.5,
                    borderRadius: 5,
                    // marginTop: normalize(24),
                    marginTop: normalize(6),
                    height: normalize(42),
                    paddingHorizontal: normalize(10),
                    // paddingVertical:normalize(6)
                  }}
                  textStyles={{
                    color: "#777777",
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                /> 
               
              </View>
            </View>
          </View>
             */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: normalize(17),
            }}>
            <NewCustomTextInput
              label="Weight"
              placeholder="Enter weight"
              value={formValues.weight}
              keyboardType="numeric"
              maxLength={3}
              inputStyle={{ width: normalize(154) }}
              onChangeText={(weight) => {
                setFormValues({ ...formValues, weight });
              }}
              right={() => (
                <View
                  style={{
                    borderLeftWidth: 0.5,
                    alignSelf: "center",
                    height: normalize(30),
                    marginLeft: normalize(15),
                    borderLeftColor: "#404040",
                  }}>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      marginTop: normalize(4),
                      marginHorizontal: normalize(15),
                    }}>
                    kg
                  </Text>
                </View>
              )}
            />
            {/* <View> */}
            <NewCustomTextInput
              label="Height"
              placeholder="ENter Height"
              value={formValues.height}
              keyboardType="numeric"
              maxLength={3}
              inputStyle={{ width: normalize(160) }}
              onChangeText={(height) => {
                setFormValues({ ...formValues, height });
              }}
              right={() => (
                <View
                  style={{
                    borderLeftWidth: 0.5,
                    alignSelf: "center",
                    height: normalize(30),
                    marginLeft: normalize(20),
                    borderLeftColor: "#404040",
                  }}>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      marginTop: normalize(4),
                      marginHorizontal: normalize(15),
                    }}>
                    cm
                  </Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              marginTop: normalize(17),
            }}>
            <NewCustomTextInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={formValues.mobile}
              onChangeText={(mobile) => {
                setFormValues({ ...formValues, mobile });
              }}
              keyboardType="numeric"
              maxLength={10}
              editable={false}
              inputStyle={{ paddingHorizontal: 35 }}
              left={() => (
                <View
                  style={{
                    alignSelf: "center",
                  }}>
                  <Image
                    style={{
                      height: normalize(30),
                      width: normalize(30),
                      marginHorizontal: normalize(5),
                    }}
                    source={images.flag}
                  />
                </View>
              )}
            />
          </View>

          <View
            style={{
              marginTop: normalize(17),
              // marginHorizontal: normalize(11),
            }}>
            <NewCustomTextInput
              name="EmergencyNumber"
              label="Emgergency contact"
              placeholder="Enter emgergency contact"
              value={formValues.emergencyMobile}
              onChangeText={(emergencyMobile) => {
                setFormValues({ ...formValues, emergencyMobile });
              }}
              keyboardType="numeric"
              maxLength={10}
              inputStyle={{ paddingHorizontal: 35 }}
              left={() => (
                <View
                  style={{
                    alignSelf: "center",
                  }}>
                  <Image
                    style={{
                      height: normalize(30),
                      width: normalize(30),
                      marginHorizontal: normalize(5),
                    }}
                    source={images.flag}
                  />
                </View>
              )}
            />
          </View>
          <View style={{ marginTop: normalize(17) }}>
            <NewCustomTextInput
              label="Email"
              placeholder="Enter email"
              value={formValues.email}
              onChangeText={(email) => {
                setFormValues({ ...formValues, email: email });
              }}
            />
          </View>
          {/* <Text style={{ marginTop: normalize(17), color: "#777777" }}>Marital Status</Text>
          <Dropdown
            options={Status}
            defaultOption={
              formValues?.maritalStatus !== "" ? formValues?.maritalStatus : "Martial Status"
            }
            selectedOption={formValues.maritalStatus}
            onOptionSelect={(maritalStatus) => {
              setFormValues({ ...formValues, maritalStatus });
            }}
            // editable={true}
            ContainerStyle={{
              // width: normalize(160),
              width: "100%",
              borderColor: "#404040",
              borderWidth: 0.5,
              borderRadius: 5,
              // marginTop: normalize(24),
              marginTop: normalize(6),
              height: normalize(42),
              paddingHorizontal: normalize(10),
              // paddingVertical:normalize(6)
            }}
            textStyles={{
              color: "#777777",
              fontSize: 14,
              fontWeight: "400",
            }}
          /> */}

          <View style={{ marginTop: normalize(17) }}>
            <CustomDropdown
              heading="Marital Status"
              data={marriageStatus}
              onSelect={handleMarriageStatusSelect}
              placeholder="Select Status"
              borderRadius={5}
              height={44}
              color={"#127DDD"}
              selectedItemColor={"#777777"}
              headingColor={"#777777"}
            />
          </View>

          <View style={{ marginTop: normalize(17) }}>
            <NewCustomTextInput
              label="Location"
              placeholder="Enter Location"
              value={formValues.location}
              onChangeText={(text) => {
                setFormValues({ ...formValues, location: text });
              }}
            />
          </View>
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
