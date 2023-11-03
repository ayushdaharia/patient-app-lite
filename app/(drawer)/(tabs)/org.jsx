import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import MyOrgIndex from "../../../components/myOrg/MyOrgIndex";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES, icons, images } from "../../../constants";
import { ScreenHeaderBtn } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_C } from "../../../global/utils/constantURL";
import { getData } from "../../../global/services/apis/getApi";
import EmployeeHealthCard from "../../../components/myOrg/EmployeeHealthCard";

const Org = () => {
  const router = useRouter();
  const [healthData, setHealthData] = useState("");
  useEffect(() => {
    getCorpEmployeeData();
  }, []);

  const [corpLogo, setCorpLogo] = useState("");
  const getCorpEmployeeData = async () => {
    const myCorpId = await AsyncStorage.getItem("CORP_ID");
    const EmpId = await AsyncStorage.getItem("Emp_ID");
    const corpLogoURL = await AsyncStorage.getItem("CORP_LOGO");
    setCorpLogo(corpLogoURL);
    console.log({ test_1231231_EmpId: EmpId });
    console.log({ test_1231231_MyCorpId: myCorpId });
    const url = BASE_URL_C + `org/detailed/${EmpId}?corpId=${myCorpId}`;
    const data = await getData(url);
    if (data.error) {
      console.log("data corp case error", data.error);
      setHealthData("");
    } else {
      console.log("data corp case success ", data.data);
      setHealthData(data?.data);
    }
  };

  console.log({ healthData });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
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
              <Image style={{ height: 43, width: 135 }} source={images.unocareLogo} />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: SIZES.medium,
              }}>
              <Image style={{ height: 43, width: 133, marginTop: 10 }} src={corpLogo} />
            </View>
          ),
          headerTitle: "",
        }}
      />
      <ScrollView>
        {healthData === "" ? (
          <Text style={styles.noHealthText}>{"No Corp Data Found"}</Text>
        ) : (
          <EmployeeHealthCard data={healthData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Org;

const styles = StyleSheet.create({
  mainHead: {
    marginHorizontal: 23,
    marginTop: 10,
  },
  headText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000000",
    lineHeight: 16,
  },
  noHealthText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
