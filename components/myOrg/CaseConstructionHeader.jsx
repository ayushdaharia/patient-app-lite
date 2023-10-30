import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { icons, images } from "../../constants";

const CaseConstructionHeader = ({ imageurl }) => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ backgroundColor: "#F5F5F5" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 13,
          marginBottom: 10,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        }}>
        <View style={{ marginBottom: 5 }}>
          <Image style={{ height: 43, width: 135 }} source={images.unocareLogo} />
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#127DDD" }}>{"Apna Cliniq"}</Text>
        </View>
        <Pressable style={{ alignItems: "center", marginTop: 7 }}>
          <Image style={{ height: 44, width: 44 }} source={icons.hamburger2} />
        </Pressable>
        <View>
          <Image style={{ height: 43, width: 133, marginTop: 10 }} src={imageurl} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CaseConstructionHeader;

const styles = StyleSheet.create({});
