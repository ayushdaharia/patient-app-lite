import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CaseConstructionHeader from "./CaseConstructionHeader";
import { BASE_URL_C } from "../../global/utils/constantURL";
import { getData } from "../../global/services/apis/getApi";
import EmployeeHealthCard from "./EmployeeHealthCard";

const MyOrgIndex = () => {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <View style={{ marginTop: 50 }}>
        {healthData === "" ? (
          <Text style={styles.noHealthText}>{"No Corp Data Found"}</Text>
        ) : (
          <Fragment>
            <CaseConstructionHeader imageurl={corpLogo} />
            <EmployeeHealthCard data={healthData} />
          </Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyOrgIndex;

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
