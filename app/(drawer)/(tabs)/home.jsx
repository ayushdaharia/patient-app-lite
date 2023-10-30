import { Alert, BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES, icons, images } from "../../../constants";
import { EmergencyServices, Latest, OtherServices, ScreenHeaderBtn } from "../../../components";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { ContextPrimary } from "../../../global/context/context";
import { useEffect } from "react";
import { BASE_URL_C } from "../../../global/utils/constantURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../../../global/services/apis/getApi";
import { normalize } from "../../../global/utils/dimensions";

const Home = () => {
  const router = useRouter();

  const { changeImg, changeName } = useContext(ContextPrimary);
  const [displayName, setDisplayName] = useState("");
  const [yourImg, setYourImg] = useState("");
  const isFocused = useIsFocused();

  const fetchUserData = async () => {
    const id = await AsyncStorage.getItem("ID_NEW");
    const mobileNo = await AsyncStorage.getItem("MOBILE_NO");
    const url = BASE_URL_C + `patient/authId/${id}?mobile=${mobileNo}`;
    const data = await getData(url);

    if (data.error) {
      console.log({ "error getting display name": data.error });
    } else {
      const fullName = data?.data?.name;
      setDisplayName(fullName);
      setYourImg(data?.data?.imageURL);
      changeImg(data?.data?.imageURL);
      changeName(data?.data?.name);
      console.log({ "success getting display name": data.data });
    }
  };

  useEffect(() => {
    isFocused && fetchUserData();
  }, [isFocused]);

  const handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true; // Prevents default behavior (going back)
  };

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    } else {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    }

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <DrawerToggleButton hamburger={true} />,
          headerRight: () => (
            <View
              style={{
                paddingRight: SIZES.medium,
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.notification2}
                dimension={50}
                handlePress={() => {}}
              />
            </View>
          ),
          headerTitle: "",
        }}
      />
      <View
        style={{
          paddingHorizontal: normalize(10),
          flexDirection: "row",
        }}>
        <Text
          style={{
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: 13,
            lineHeight: 20,
            color: "#404040",
          }}>{`GoodMorning, `}</Text>
        <Text
          style={{
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 20,
            color: "#404040",
          }}>
          {displayName}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Latest />
          <EmergencyServices />
          <OtherServices />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
