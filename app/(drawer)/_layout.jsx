import React, { useContext } from "react";
import Drawer from "expo-router/drawer";
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../global/utils/constantURL";
import { getUserToken } from "../../global/services/apis/apiCalls";
import { useState } from "react";
import { SIZES, icons, images } from "../../constants";
import { ContextPrimary } from "../../global/context/context";
import { DrawerItemList } from "@react-navigation/drawer";

const Layout = () => {
  const router = useRouter();
  const { profileimg, userName } = useContext(ContextPrimary);
  const [modalVisible, setModalVisible] = useState(false);
  const logout = async () => {
    const userId = await AsyncStorage.getItem("USER_ID");

    console.log(userId);
    const url = BASE_URL + "auth/logout";
    console.log(url);
    const obj = {
      username: userId,
    };
    const data = await getUserToken(url, obj);

    if (data.error) {
      console.log(data.error);
    } else {
      await AsyncStorage.clear();
      await AsyncStorage.removeItem("ACCESS_TOKEN");
      await AsyncStorage.removeItem("MOBILE_NO");
      await AsyncStorage.removeItem("USER_ID");
      console.log("success");
      router.replace("login");
      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => backHandler.remove();
    }
  };
  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 250,
        },
        drawerLabelStyle: { color: "0A276B" },
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                padding: 10,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderBottomColor: "#000000",
              }}>
              <Image
                source={images.unocareLogo}
                style={{ height: 100, width: 230 }}
                resizeMode="contain"
              />
              <Text style={{ marginTop: -20, fontSize: SIZES.medium }}>Sab Theek Ho Jaega</Text>
            </View>
            <DrawerItemList {...props} />
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Logout", "Do you want to Logout?", [
                  {
                    text: "Cancel",
                    onPress: () => {
                      router.replace("home");
                    },
                    style: "cancel",
                  },
                  { text: "Ok", onPress: () => logout() },
                ]);
              }}>
              <View
                style={{
                  paddingHorizontal: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  style={{ height: 30, width: 30, tintColor: "#000000" }}
                />
                <Text
                  style={{
                    color: "#0A276B",
                    fontSize: SIZES.large,
                    fontWeight: "500",
                    marginLeft: 30,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: `${userName}`,
          title: `${userName}`,
          drawerLabelStyle: {
            marginLeft: -15,
            fontSize: SIZES.large,
          },
          drawerInactiveTintColor: "#0A276B",
          drawerActiveTintColor: "#FFFFFF",
          drawerActiveBackgroundColor: "#127DDD",
          drawerIcon: ({ focused }) =>
            profileimg ? (
              <Image
                source={{ uri: profileimg }}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 25,
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={focused ? icons.profileCircleWhite : icons.profileCircle}
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 15,
                  borderRadius: 25,
                }}
                resizeMode="contain"
              />
            ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerLabelStyle: {
            fontSize: SIZES.large,
          },
          drawerInactiveTintColor: "#0A276B",
          drawerActiveTintColor: "#FFFFFF",
          drawerActiveBackgroundColor: "#127DDD",
          drawerContentStyle: {
            borderRadius: 10,
          },
          drawerIcon: ({ focused }) => (
            <Image
              source={focused ? icons.homeWhite : icons.home}
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
            />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
