import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { openPDFFiles } from "../../global/utils/util";
import { screenWidth } from "../../global/utils/dimensions";
import { icons } from "../../constants";

const EmployeeHealthCard = ({ data }) => {
  const {
    name = "",
    empId = "",
    mobile = "",
    gender = "",
    city = "",
    email = "",
    designation = "",
    department = "",
    imageUrl = "",
    date = "",
    reportingTo = "N/A",
  } = data;

  console.log({ data_test_7681253: data });
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const displayVitals = [
    {
      title: "BP",
      value: data?.bp ? `${data?.bp} mmHg` : "N/A",
      isDisplayURL: false,
      displayURL: null,
    },
    {
      title: "Sugar",
      value: data?.sugar ? `${data?.sugar} mgdL` : "N/A",
      isDisplayURL: false,
      displayURL: null,
    },
    {
      title: "Height",
      value: data?.height ? `${data?.height} cm` : "N/A",
      isDisplayURL: false,
      displayURL: null,
    },
    {
      title: "Weight",
      value: data?.weight ? `${data?.weight} kg` : "N/A",
      isDisplayURL: false,
      displayURL: null,
    },
    {
      title: "BMI",
      value: data?.bmi ? `${data?.bmi} kg/m^2` : "N/A",
      isDisplayURL: false,
      displayURL: null,
    },
    // {
    //   title: "Glasses Required",
    //   value: data?.glass ? "Yes" : data?.glass === false ? "No" : "N/A",
    //   isDisplayURL: false,
    //   displayURL: null,
    // },
    // {
    //   title: "Cataract",
    //   value: data?.cataract ? "Yes" : data?.cataract === false ? "No" : "N/A",
    //   isDisplayURL: false,
    //   displayURL: null,
    // },
    // {
    //   title: "Hearing",
    //   value: data?.hearing || "N/A",
    //   isDisplayURL: false,
    //   displayURL: null,
    // },
    // {
    //   title: "X-Ray",
    //   value: data?.xrayDone ? "Yes" : data?.xrayDone === false ? "No" : "N/A",
    //   isDisplayURL: data?.xrayDone,
    //   displayURL: data?.xrayUrl,
    // },
    {
      title: "X-Ray Film",
      value: data?.xrayFilmUrl ? "Yes" : data?.xrayFilmUrl === false ? "No" : "N/A",
      isDisplayURL: data?.xrayFilmUrl,
      displayURL: data?.xrayFilmUrl,
    },
    {
      title: "Blood Test",
      value: data?.bloodTestUrl ? "Yes" : data?.bloodTestUrl === false ? "No" : "N/A",
      isDisplayURL: data?.bloodTestUrl,
      displayURL: data?.bloodTestUrl,
    },
    {
      title: "PFT",
      value: data?.pftUrl ? "Yes" : data?.pftUrl === false ? "No" : "N/A",
      isDisplayURL: data?.pftUrl,
      displayURL: data?.pftUrl,
    },
    {
      title: "Audiometry",
      value: data?.audiometryUrl ? "Yes" : data?.audiometryUrl === false ? "No" : "N/A",
      isDisplayURL: data?.audiometryUrl,
      displayURL: data?.audiometryUrl,
    },
    {
      title: "ECG",
      value: data?.ecgUrl ? "Yes" : data?.ecgUrl === false ? "No" : "N/A",
      isDisplayURL: data?.ecgUrl,
      displayURL: data?.ecgUrl,
    },
    {
      title: "Eye Test",
      value: data?.eyeTestUrl ? "Yes" : data?.eyeTestUrl === false ? "No" : "N/A",
      isDisplayURL: data?.eyeTestUrl,
      displayURL: data?.eyeTestUrl,
    },
    // {
    //   title: "Urine Sample",
    //   value: data?.urineSampleCollected
    //     ? "Yes"
    //     : data?.urineSampleCollected === false
    //     ? "No"
    //     : "N/A",
    //   isDisplayURL: data?.urineSampleCollected,
    //   displayURL: data?.urineTestUrl,
    // },

    // {
    //   title: "Fitness Report",
    //   value: data?.fitToWork ? "Yes" : data?.fitToWork === false ? "No" : "N/A",
    //   isDisplayURL: data?.fitToWork,
    //   displayURL: data?.fitnessCertificateUrl,
    // },

    // {
    //   title: "FORM 32",
    //   value: data?.form32Url ? "Yes" : data?.form32Url === false ? "No" : "N/A",
    //   isDisplayURL: data?.form32Url,
    //   displayURL: data?.form32Url,
    // },
  ];

  const currentDate = date ? new Date(date) : new Date();
  let newdate = moment(currentDate).format("dddd, MMMM Do YYYY");

  const showPDF = async (url) => {
    if (url) {
      openPDFFiles(url);
      console.log(url);
    }
  };

  return (
    <SafeAreaView
      style={{
        borderColor: "#BCBCBC",
        width: screenWidth,
        height: 350,
        flex: 1,
      }}>
      <View
        style={{
          width: screenWidth,
          alignItems: "center",
          alignSelf: "center",
          borderWidth: 0.5,
          borderColor: "#D4D4D4",
          backgroundColor: "#fff",
          shadowColor: "#000",
          marginBottom: 10,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 3,
        }}>
        <Image
          style={{
            width: 70,
            height: 70,
            marginBottom: 10,
            marginTop: 10,
            borderRadius: 35,
          }}
          source={imageUrl ? { uri: imageUrl } : icons.profileIcon}
        />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: "#383838",
            marginBottom: 10,
          }}>
          {name ? name : "N/A"}
        </Text>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 10,
          }}>
          <PersonDescription source={icons.genderIcon} description={gender} />
          <PersonDescription source={icons.mapIcon} description={city ? city : "N/A"} />
          <PersonDescription source={icons.mailIcon} description={email ? email : "N/A"} />
          <PersonDescription source={icons.phoneIcon} description={mobile ? mobile : "N/A"} />
        </View>

        <View
          style={{
            borderWidth: 0.5,
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
            borderColor: "#BCBCBC",
          }}></View>

        <View style={styles.rowView}>
          <MiddleComponent title={"Designation"} value={designation ? designation : "N/A"} />
          <MiddleComponent title={"Department"} value={department ? department : "N/A"} />
          <MiddleComponent title={"Reporting To"} value={reportingTo ? reportingTo : "N/A"} />
          <MiddleComponent title={"Emp. ID"} value={empId ? empId : "N/A"} />
        </View>
      </View>
      <View style={{}}>
        <View
          style={{
            height: 30,
            borderRadius: 5,
            backgroundColor: "#E0F0FF",
            justifyContent: "flex-start",
            gap: 7,
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: 10,
            // marginTop: 5,
          }}>
          <View
            style={{
              width: 3,
              backgroundColor: "#0045B9",
              height: 23,
              borderRadius: 2,
              marginLeft: 7,
            }}></View>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#0045B9" }}>{newdate}</Text>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            height: 300,
            marginBottom: 20,
          }}>
          <View
            style={{
              flexDirection: "row",
              height: 40,
              marginBottom: 4,
            }}>
            <View
              style={{
                width: 180,
                justifyContent: "center",
                paddingLeft: 2,
              }}>
              <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }} numberOfLines={1}>
                Name
              </Text>
            </View>

            <View
              style={{
                width: 120,
                justifyContent: "center",
                paddingLeft: 10,
              }}>
              <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }} numberOfLines={1}>
                Value
              </Text>
            </View>

            <View
              style={{
                width: 40,
                justifyContent: "center",
                paddingLeft: 5,
              }}>
              <Text style={{ fontSize: 15, fontWeight: "400", color: "black" }} numberOfLines={1}>
                View
              </Text>
            </View>
          </View>
          <ScrollView style={{ width: "100%" }}>
            <View style={{ marginBottom: 60 }}>
              {displayVitals.map((val, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    height: 25,
                    marginBottom: 4,
                  }}>
                  <View
                    style={{
                      width: 180,
                      justifyContent: "center",
                      paddingLeft: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color: "black",
                      }}
                      numberOfLines={1}>
                      {val.title}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 120,
                      justifyContent: "center",
                      paddingLeft: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color: "black",
                      }}
                      numberOfLines={1}>
                      {val.value}
                    </Text>
                  </View>

                  {val.isDisplayURL && (
                    <Pressable
                      onPress={() => {
                        showPDF(val.displayURL);
                        console.log("hi");
                      }}>
                      <View
                        style={{
                          width: 40,
                          justifyContent: "center",
                          paddingLeft: 5,
                        }}>
                        <Image source={icons.eye} style={{ height: 20, width: 26 }} />
                      </View>
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeHealthCard;

const PersonDescription = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>
      {props?.source && (
        <Image style={{ width: 15, height: 15, marginRight: 10 }} source={props?.source} />
      )}
      <Text
        style={{
          fontSize: 13,
          fontWeight: "400",
          color: "#6B6B6B",
          width: 110,
        }}>
        {props.description}
      </Text>
    </View>
  );
};

const MiddleComponent = (props) => {
  return (
    <View
      style={[
        {
          width: "25%",
          marginBottom: 10,
        },
      ]}>
      <Text style={styles.keyText}>{props.title}</Text>
      <Text style={styles.valueStyle}>{props.value}</Text>
    </View>
  );
};
const PersonalBmi = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#A5A5A5",
        height: 40,
        marginBottom: 4,
        backgroundColor: "#FAFAFA",
      }}>
      <View style={{ width: 180, justifyContent: "center", paddingLeft: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "400", color: "black" }} numberOfLines={1}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          height: "80%",
          alignSelf: "center",
          borderColor: "#A5A5A5",
        }}></View>
      <View style={{ width: 120, justifyContent: "center", paddingLeft: 10 }}>
        <Text
          style={{
            fontSize: 13,
            fontWeight: "400",
            color: props.color,
          }}
          numberOfLines={1}>
          {props.value}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          height: "80%",
          alignSelf: "center",
          borderColor: "#A5A5A5",
        }}></View>
      <View style={{ width: 120, justifyContent: "center", paddingLeft: 10 }}>
        <Text style={{ fontSize: 13, fontWeight: "400", color: "black" }} numberOfLines={1}>
          {props.unit}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: 18,
  },
  keyText: {
    color: "#6B6B6B",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 16,
  },
  valueStyle: {
    color: "#404040",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 16,
    marginTop: 5,
  },
});
