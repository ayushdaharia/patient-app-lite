import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES, icons, images } from "../../../constants";

const Layout = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardOpen(false);
    });

    // Clean up listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCallPress = () => {
    Alert.alert(
      "Call Uno.care",
      "Do you want to make a call to Uno.care?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => {
            Linking.openURL("tel:18008890189");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 60,
          width: "100%",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center", top: 5 }}>
              <Image
                source={focused ? icons.homeBlue : icons.home}
                style={{ height: 24, width: 24 }}
              />
              <Text style={styles.title(focused)}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="uploadFile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center", top: 5 }}>
              <Image
                source={focused ? icons.uploadBlue : icons.upload}
                style={{ height: 24, width: 24 }}
              />
              <Text style={styles.title(focused)}>Upload</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="callUs"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TouchableOpacity
              onPress={() => {
                handleCallPress();
              }}>
              <View
                style={{
                  alignItems: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: keyboardOpen ? -10 : 25,
                }}>
                <Image source={icons.icon24by7} style={{ height: 50, width: 50 }} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="raiseTicket"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center", top: 5 }}>
              <Image
                source={focused ? icons.ticketBlue : icons.ticket}
                style={{ height: 24, width: 24 }}
              />
              <Text style={styles.title(focused)}>Ticket</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="org"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center", top: 5 }}>
              <Image
                source={focused ? icons.userBlue : icons.user}
                style={{ height: 25, width: 25 }}
              />
              <Text style={styles.title(focused)}>Corp</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({
  title: (focused) => ({
    fontSize: SIZES.small,
    color: focused ? "#127DDD" : "#000000", // Change the text color based on the focused prop
  }),
});
