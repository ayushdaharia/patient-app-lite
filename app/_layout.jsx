import { Stack, useRouter } from "expo-router";
import React from "react";
import { useState } from "react";
import { ContextPrimary } from "../global/context/context";

const TabLayout = () => {
  const router = useRouter();

  const [profileimg, setProfileimg] = useState("");
  const [userName, setUserName] = useState("");

  const changeImg = (value) => {
    setProfileimg(value);
  };

  const changeName = (value) => {
    setUserName(value);
  };

  return (
    <ContextPrimary.Provider
      value={{
        dashboard: "dashboard",
        profileimg,
        changeImg,
        userName,
        changeName,
      }}>
      <Stack initialRouteName="splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="setupProfile" options={{ headerShown: false }} />
      </Stack>
    </ContextPrimary.Provider>
  );
};

export default TabLayout;
