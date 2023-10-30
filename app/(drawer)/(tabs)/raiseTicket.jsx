import {
  StyleSheet,
  Alert,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Button } from "react-native-paper";
import axios from "axios";
import { COLORS, SIZES, icons } from "../../../constants";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../../../components";

const RaiseTicket = () => {
  const router = useRouter();
  const [remark, setRemark] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: true,
      });

      if (!result.canceled) {
        const selectedDocs = result.assets;
        console.log(selectedDocs, "documents selected");
        setFiles([...files, ...selectedDocs]);
      } else {
        console.log("Document selection was canceled or failed.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFile = (index) => {
    // Create a copy of the files array without the file at the specified index
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
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
                quality: 1,
              });

              console.log({ image });

              if (!image.canceled) {
                const manipulatedImage = await ImageManipulator.manipulateAsync(
                  image.assets[0].uri,
                  [{ resize: { width: 300, height: 600 } }],
                  { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );

                console.log({ manipulatedImage });

                if (manipulatedImage.uri) {
                  const imageFile = {
                    uri: manipulatedImage.uri,
                    name: manipulatedImage.uri.split("/").pop(),
                    mimeType: "image/*",
                  };

                  setFiles([...files, imageFile]);
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

  const handleRaiseTicket = async () => {
    setIsLoading(true);
    const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
    let pId = await AsyncStorage.getItem("PATIENT_ID");
    let formData = new FormData();

    formData.append("patientId", pId);
    formData.append("remarks", remark);
    formData.append("status", "TICKET_RAISED");
    formData.append("ticketType", "COUNSELLING_EMERGENCY");
    formData.append("ticketMode", "SMS");
    formData.append("ticketCategory", "COUNSELLING");

    console.log({ files });

    files.map((image, index) => {
      formData.append("file", {
        uri: image.uri,
        name: image.name,
        type: image.mimeType,
      });
    });

    console.log({ files });

    console.log("hii");

    const result = await axios({
      method: "post",
      url: `https://apna-clinic.com/api/patient/register`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (result?.data) {
      console.log("SUCCESS", result.data);
      alert("Successfully Sent");
      setRemark("");
      setFiles([]);
      setIsLoading(false);
    } else {
      console.log("ERROR", result.error);
      alert("An Error Occured");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
          headerTitle: "Ticket",
        }}
      />
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {isLoading ? (
          <ActivityIndicator color="#127DDD" /> // Show loading indicator
        ) : (
          <View>
            <Text style={{ fontSize: SIZES.medium, marginVertical: 10, color: "#000000" }}>
              Upload Images
            </Text>
            <TouchableOpacity>
              <Button
                onPress={() => {
                  captureImage();
                }}
                style={{ backgroundColor: "#127DDD", width: 100 }}>
                <Text style={{ color: COLORS.white, fontSize: SIZES.medium }}>Upload</Text>
              </Button>
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
              {files.map((file, index) => (
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

            <Text style={{ fontSize: SIZES.medium, marginVertical: 10, color: "#000000" }}>
              Remark For Raising Ticket
            </Text>
            <View style={styles.containerInput}>
              <TextInput
                multiline
                numberOfLines={6}
                style={[styles.inputStyle, { textAlignVertical: "top", textAlign: "left" }]}
                placeholder="Enter Remark for Raising Ticket..."
                placeholderTextColor={COLORS.gray}
                value={remark}
                onChangeText={(text) => setRemark(text)}
              />
            </View>

            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <TouchableOpacity>
                <Button
                  onPress={() => handleRaiseTicket()}
                  disabled={remark == "" ? true : false}
                  style={{
                    backgroundColor: remark == "" ? COLORS.gray : "#127DDD",
                    width: 100,
                  }}>
                  <Text style={{ color: COLORS.white, fontSize: SIZES.medium }}>Save</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RaiseTicket;

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
