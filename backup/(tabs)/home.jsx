import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Slot, Stack, DrawerActions, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, icons, images } from "../../constants";
import {
  EmergencyServices,
  Latest,
  OtherServices,
  ScreenHeaderBtn,
  Search,
} from "../../components";
import { DrawerToggleButton } from "@react-navigation/drawer";

const Home = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <DrawerToggleButton hamburger={true} />
            // <View
            //   style={{
            //     paddingLeft: SIZES.medium,
            //   }}>
            //   <ScreenHeaderBtn iconUrl={icons.hamburger2} dimension={50} handlePress={() => {}} />
            // </View>
          ),
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
