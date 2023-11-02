import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, ToastAndroid } from "react-native";
import { images } from "../../constants";
import { colors, fontFamily, fontSize, levels } from "../../constants/themeOld";
import OTPTextView from "react-native-otp-textinput";
import { useRouter } from "expo-router";
import { BASE_URL, BASE_URL_C } from "../../global/utils/constantURL";
import { getUserToken } from "../../global/services/apis/apiCalls";
import { getData } from "../../global/services/apis/getApi";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { storeData } from "../../global/utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogInWithOTP = ({ setIsOTPReceived, mobile, OTPRequest }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const retrieve_FCM_Token = async () => {
    try {
      const value = await AsyncStorage.getItem("fcmToken");
      if (value !== null) {
        // We have data!!
        console.log("FCM", value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  //Send Neccessary Details
  const authencation = async (userID) => {
    const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
    const fcm_token = await AsyncStorage.getItem("fcmToken");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    let params = {
      os: "ANDROID",
      token: fcm_token,
      userId: userID,
    };
    {
      await axios
        .post("https://apna-clinic.com/api/doctor/save/token", params, headers, {
          timeout: 3000,
        })
        .then(async (response) => {
          console.log("#. saveHandler() : ", response.data);
        })
        .catch((error) => {
          console.log("#. saveHandler() error1 : ", error);
        });
    }
  };

  //LogIn with OTP
  const OTPLogIn = async () => {
    if (otp !== "") {
      const params = {
        mobile: mobile,
        otp: otp,
      };
      const url = BASE_URL + "authenticate/otp/patient";

      fetchLoginDetails(url, params);
    } else {
      alert("Please enter the OTP");
    }
  };

  const fetchLoginDetails = useCallback(async (url, data) => {
    const user = await getUserToken(url, data);
    if (user.error) {
      ToastAndroid.show({
        position: "Top",
        topOffset: 10,
        autoHide: true,
        visibilityTime: 3000,
        type: "error",
        text1: "OTP Invalid.",
      });
      console.log({ "auth data error": user.error });
    } else {
      const data = user.data;
      const token = await data.token;
      const dData = await jwt_decode(token);

      storeData("ACCESS_TOKEN", token);
      storeData("USER_ID", dData.userID);
      storeData("ID_NEW", dData.id.toString());
      storeData("MOBILE_NO", dData.sub);

      console.log({ dDataddddddd: dData.sub });

      authencation(dData.userID);
      getCorpEMPDetails(dData);

      console.log({ "auth data success======?>>>>>>": dData });
    }
  }, []);

  useEffect(() => {
    retrieve_FCM_Token();
  }, []);

  const getCorpEMPDetails = async (userData) => {
    const url = BASE_URL_C + `patient/authId/${userData.id}?mobile=${mobile}`;
    const employee = await getData(url);
    console.log(employee.data);
    console.log({ url });
    console.log(userData.id);
    console.log(mobile);

    if (employee.error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60
      );

      console.log({ employee_error: employee.error });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "OTP Verified Successfully.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        60
      );
    }
    const patientId = employee?.data?.patientId;
    storeData("PATIENT_ID", patientId?.toString());
    storeData("Corp_EmpId", employee?.data?.corpEmpId?.toString());
    storeData("FAMILY_ID", employee?.data?.familyId?.toString());
    storeData("Emp_ID", employee?.data?.empId?.toString());
    storeData("CORP_ID", employee?.data?.corpId?.toString());
    storeData("CORP_LOGO", employee?.data?.corpLogoUrl?.toString());

    if (userData.isActive) {
      router.replace("home");
      // router.replace({
      //   pathname: "setupProfile",
      //   params: {
      //     mobile: mobile,
      //     employee: employee.data,
      //   },
      // });
    } else {
      router.replace({
        pathname: "setupProfile",
        params: JSON.stringify({
          mobile: mobile,
          employee: employee.data,
        }),
      });
    }
    console.log({ employee_success: employee.data });
  };

  const [isResendOtpEnabled, setIsResendOtpEnabled] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setIsResendOtpEnabled(true);
    }
  }, [countdown]);

  const handleResendOTP = () => {
    setIsResendOtpEnabled(false);
    setCountdown(30);
    OTPRequest();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.logoContainer}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <View
            style={{
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
              marginBottom: 70,
            }}>
            <View
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: "#127DDD",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 70,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "#127DDD",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Image
                  style={{
                    width: 220,
                    height: 244,
                    resizeMode: "cover",
                    objectFit: "cover",
                  }}
                  source={images.otpScreenBanner}
                />
              </View>
            </View>
          </View>
          <OTPTextView
            tintColor="#127DDD"
            handleTextChange={(text) => setOtp(text)}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
          />
          <View
            style={{
              paddingVertical: 30,
              paddingHorizontal: 40,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            {isResendOtpEnabled ? (
              <Pressable onPress={handleResendOTP}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    lineHeight: 25,
                    color: "#127DDD",
                  }}>
                  Resend OTP
                </Text>
              </Pressable>
            ) : (
              <Text
                style={{
                  color: "#127DDD",
                  fontWeight: "700",
                  fontSize: 18,
                  lineHeight: 25,
                }}>
                Resend {countdown}
              </Text>
            )}
            <View
              style={{
                height: 40,
                width: 0,
                borderWidth: 1,
                borderColor: "#127DDD",
              }}></View>
            <View>
              <Pressable onPress={() => setIsOTPReceived(false)}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                    lineHeight: 25,
                    color: "#127DDD",
                  }}>
                  Change Number
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={OTPLogIn}
            style={{
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
              }}>
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
    borderColor: colors.textFaint,
    padding: levels.l2,
    fontFamily: fontFamily.tertiaryMd,
    width: "100%",
    height: 40,
    color: "#717171",
  },
  btnTxt: {
    color: colors.secondary,
    fontSize: fontSize.h1,
    fontFamily: fontFamily.primaryBold,
    alignSelf: "center",
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
    borderWidth: 3,
  },
});

export default LogInWithOTP;
