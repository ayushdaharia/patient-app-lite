import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { ActivityIndicator, Button } from "react-native-paper";
import { COLORS, SIZES, icons } from "../../../constants";
import { Stack, router } from "expo-router";
import { ScreenHeaderBtn } from "../../../components";

const HelpIndex = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  const [imageSrc, setImageSrc] = useState([]);

  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Specify the allowed document type(s)
        multiple: true, // Allow multiple document selection
      });

      console.log({ result });

      if (!result.canceled) {
        const selectedDocs = result.assets;
        console.log(selectedDocs, "documents selected");

        setImageSrc([...imageSrc, ...selectedDocs]);
        // uploadFileMultiple();
      } else {
        console.log("Document selection was canceled or failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFile = (index) => {
    // Create a copy of the files array without the file at the specified index
    const updatedFiles = [...imageSrc];
    updatedFiles.splice(index, 1);
    setImageSrc(updatedFiles);
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
                aspect: [4, 3],
                quality: 0,
              });

              console.log({ image });

              if (!image.canceled) {
                const manipulatedImage = await ImageManipulator.manipulateAsync(
                  image.assets[0].uri,
                  [{ resize: { width: 300, height: 700 } }],
                  { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );

                console.log({ manipulatedImage });

                if (manipulatedImage.uri) {
                  const imageFile = {
                    uri: manipulatedImage.uri,
                    name: manipulatedImage.uri.split("/").pop(),
                    mimeType: "image/*",
                  };

                  setImageSrc([...imageSrc, imageFile]);
                  // uploadFileMultiple();
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
            selectDoc();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const uploadFileMultiple = async () => {
    let pId = await AsyncStorage.getItem("PATIENT_ID");
    setIsLoading(true);
    const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
    console.log("HI ACCES TOKEN", access_token);

    console.log({ imageSrc });

    const formData = new FormData();

    imageSrc.map((image, index) => {
      formData.append("file", {
        uri: image.uri,
        name: image.name,
        type: image.mimeType,
      });
    });

    try {
      const response = await axios({
        method: "post",
        url: `https://apna-clinic.com/api/cms/upload?patientId=${pId}&date=${date}&file=&type=REPORT`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = response?.data;
      console.log({ image_upload: data });
      console.log({ SUCCESS: data });
      alert("Successfully Uploaded.");
      setImageSrc([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Failed to upload.");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                paddingLeft: SIZES.medium,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="80%"
                handlePress={() => {
                  router.back();
                }}
                title="Upload"
              />
            </View>
          ),
          headerTitle: "Upload",
        }}
      />
      {isLoading ? (
        <ActivityIndicator color="#127DDD" /> // Show loading indicator
      ) : (
        <ScrollView style={{ flex: 1, padding: 15 }}>
          <Fragment>
            <Pressable
              onPress={() => {
                captureImage();
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  height: 58,
                  alignSelf: "center",
                  marginVertical: 20,
                  backgroundColor: "#127DDD",
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 10,
                    color: "#FFFFFF",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: 20,
                    lineHeight: 30,
                  }}>
                  Upload Images/PDFs
                </Text>
                <Image
                  source={icons.uploadWhite}
                  style={{
                    flexDirection: "column",
                    width: 24,
                    height: 24,
                    margin: 15,
                  }}
                />
              </View>
            </Pressable>

            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
              {imageSrc.map((file, index) => (
                <View key={index} style={styles.selectedImageContainer}>
                  <View>
                    <Image source={{ uri: file.uri }} style={styles.selectedImage} />
                    <TouchableOpacity onPress={() => removeFile(index)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <TouchableOpacity>
                <Button
                  onPress={() => uploadFileMultiple()}
                  disabled={imageSrc.length === 0 ? true : false}
                  style={{
                    backgroundColor: imageSrc.length === 0 ? COLORS.gray : "#127DDD",
                    width: 100,
                  }}>
                  <Text style={{ color: COLORS.white, fontSize: SIZES.medium }}>Save</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </Fragment>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HelpIndex;
const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABB2B9",
  },
  inputStyle: {
    width: "100%",
    flex: 1,
    fontSize: SIZES.medium,
    color: "#000000",
    height: 100,
  },
  selectedImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
  },
  removeText: {
    color: "red",
    textAlign: "center",
  },
});
