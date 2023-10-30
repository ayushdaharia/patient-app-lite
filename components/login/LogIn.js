import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ToastAndroid,
} from "react-native";

import { images } from "../../constants";
import LogInWithOTP from "./LogInwithOTP";
import { colors, fontFamily, fontSize, levels } from "../../constants/themeOld";
import { useRouter } from "expo-router";
import { BASE_URL, BASE_URL_C } from "../../global/utils/constantURL";
import { getOTPByMobile } from "../../global/services/apis/apiCalls";
import { getData } from "../../global/services/apis/getApi";

const LogIn = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  const OTPRequest = async () => {
    if (userName !== "" && userName.length === 10 && isNaN(userName) === false) {
      const params = {
        mobile: userName,
      };

      fetchOTPHandler(BASE_URL + "send/patient/otp", params, userName);
    } else {
      alert("Please enter the correct Mobile No.");
      setError(true);
    }
  };

  const fetchOTPHandler = useCallback(async (url, data, userName) => {
    const user = await getOTPByMobile(url, data);
    if (user.error) {
      console.log({ "auth data error": "error" });
      console.log("#. login() error : ", err);
    } else {
      console.log({ "auth data success": "success" });
      console.log("OTP Request", user.data);
      //alert('OTP Sent');
      //navigation.navigate('EnterOTP', {mobileNo: userName});
      setIsOTPReceived(true);
    }
  }, []);

  const retrieve_Access_Token = async () => {
    try {
      const value = await AsyncStorage.getItem("ACCESS_TOKEN");
      const userId = await AsyncStorage.getItem("USER_ID");

      if (value) {
        // We have data!!
        getPatientDEtails(userId);
        router.replace("setupProfile");
        console.log("Access_Token", value);
      } else {
        null;
      }
    } catch (error) {
      // Error retrieving data
      console.log("error");
    }
  };

  const getPatientDEtails = async (userId) => {
    const url = BASE_URL_C + "patient/userId/" + userId;
    const patient = await getData(url);

    if (patient.error) {
      console.log({ "error getting display name": patient.error });
    } else {
      console.log({ "success getting display name": patient.data });
      const patientId = patient.data.patientId;
      storeData("PATIENT_ID", patientId.toString());
    }
  };

  useEffect(() => {
    retrieve_Access_Token;
  }, []);

  const [isOTPReceived, setIsOTPReceived] = useState(false);

  if (isOTPReceived) {
    return (
      <LogInWithOTP setIsOTPReceived={setIsOTPReceived} mobile={userName} OTPRequest={OTPRequest} />
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
      }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}>
        <Image
          style={{
            width: "56%",
            height: 40,
            resizeMode: "cover",
            objectFit: "contain",
            marginBottom: 50,
          }}
          source={images.unocareLogo}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}>
        <Image
          style={{
            width: 220,
            height: 244,
            resizeMode: "cover",
            objectFit: "cover",
          }}
          source={images.loginBannerOld}
        />
      </View>
      <View style={{ width: "100%", marginTop: 40 }}>
        <View
          style={{
            width: "100%",
            padding: levels.l4,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View style={error ? styles.inputs_error : styles.inputs}>
            <View
              style={{
                flexDirection: "row",
                //justifyContent: 'center',
                alignItems: "center",
              }}>
              <Image source={images.flagIndia} style={{ height: 24, width: 24 }} />
              <View
                style={{
                  height: 0,
                  width: 30,
                  borderWidth: 0.5,
                  borderColor: "#127DDD",
                  transform: [{ rotateZ: "90deg" }],
                  borderStyle: "solid",
                }}></View>
              <TextInput
                style={{
                  width: "85%",
                  padding: 5,
                  fontWeight: "600",
                  fontSize: 18,
                  lineHeight: 21,
                  //backgroundColor: 'red',
                  justifyContent: "center",

                  color: "#127DDD",
                }}
                keyboardType="numeric"
                autoCapitalize="none"
                placeholder="Enter Your Phone Number"
                maxLength={10}
                placeholderTextColor={"rgba(18, 125, 221, 0.75)"}
                onChangeText={(text) => {
                  setUserName(text);
                  setError(false);
                }}
              />
            </View>
          </View>
          <Pressable
            onPress={OTPRequest}
            style={{
              marginTop: 40,
              width: "60%",
              height: 60,
              backgroundColor: "#127DDD",
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 22,
                lineHeight: 30,
                color: "#FFFFFF",
                marginBottom: 5,
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    // backgroundColor: "red",
    alignContent: "center",
    justifyContent: "center",
    //padding: 200
  },
  label: {
    fontFamily: fontFamily.tertiarySemi,
    marginBottom: levels.l1,
    color: "#717171",
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.primary,
    padding: levels.l2,
    fontFamily: fontFamily.tertiaryMd,
    width: "100%",
    height: 50,
    color: "#000000",
  },
  inputs_error: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "red",
    padding: levels.l2,
    fontFamily: fontFamily.tertiaryMd,
    width: "100%",
    height: 50,
    color: "#000000",
  },
  inputs_password: {
    padding: levels.l2,
    fontFamily: fontFamily.tertiaryMd,
    width: "90%",
    height: 50,
    color: "#000000",
  },

  btnTxt: {
    color: colors.secondary,
    fontSize: fontSize.h1,
    fontFamily: fontFamily.primaryBold,
    alignSelf: "center",
    color: "white",
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    borderColor: colors.primary,
    padding: levels.l3,
    paddingLeft: levels.l7,
    paddingRight: levels.l7,
    alignSelf: "center",
    marginTop: 30,
    width: "100%",
  },
  secondaryBtn: {
    backgroundColor: colors.textFaint,
    borderRadius: 20,
    borderColor: colors.primary,
    padding: levels.l3,
    paddingLeft: levels.l7,
    paddingRight: levels.l7,
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});

export default LogIn;
