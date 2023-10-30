import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { COLORS, SIZES, icons } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";
import { useRouter } from "expo-router/src/hooks";
import MyProfile from "../../../components/myProfile/MyProfile";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Drawer.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="80%"
                handlePress={() => {
                  router.push("/(drawer)/home");
                }}
                title="Upload"
              />
            </View>
          ),
          headerTitle: "My Profile",
        }}
      />
      <MyProfile />
    </SafeAreaView>
  );
};

export default index;
