import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

const MyOrgItem = ({
  upperList,
  buttonList1,
  date,
  photoModalVisible,
  setPhotoModalVisible,
  setImage,
}) => {
  const viewImage = (item) => {
    setImage(item?.value);
    setPhotoModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerDate}>
        <Text style={{ color: "white" }}>{moment(date).format("MMM DD,YYYY")}</Text>
      </View>

      {/* <View style={styles.rowView}>
        {upperList.map((item, index) => (
          <View
            key={index}
            style={[
              { height: normalize(40),paddingRight:15 },
              index < 4
                ? { marginBottom: normalize(22) }
                : { marginBottom: normalize(15) },

              index < 4 || index > 7
                ? { marginRight: normalize(7) }
                : { marginRight: normalize(14) },,
            ]}
          >
            <Text style={styles.keyText}>{item.key}</Text>
            <Text style={styles.valueStyle}>{item.value}</Text>
          </View>
        ))}
      </View> */}

      <View style={styles.rowView}>
        {upperList.map((item, index) => (
          <View
            key={index}
            style={[
              {
                height: 35,
                width: "33%",
                marginBottom: 10,
              },
            ]}>
            <Text style={styles.keyText}>{item.key}</Text>
            <Text style={styles.valueStyle}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          //   justifyContent: "space-between",
          flexWrap: "wrap",
          //   paddingHorizontal: normalize(7),
        }}>
        {buttonList1.map((item, index) => (
          <Pressable
            style={styles.reportButton}
            key={index}
            onPress={() => {
              viewImage(item);
            }}>
            <Text style={{ color: "#FFFFFF", fontSize: 13, lineHeight: 15, fontWeight: "400" }}>
              {item.key}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MyOrgItem;

const styles = StyleSheet.create({
  container: {
    // height: normalize(450),
    paddingVertical: 5,
    width: 350,
    // borderWidth: 0.5,
    borderRadius: 15,
    marginTop: 21,
    paddingHorizontal: 8,
    backgroundColor: "#E9F4FF",
    alignSelf: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  innerDate: {
    justifyContent: "center",
    alignItems: "center",
    width: 330,
    borderRadius: 20,
    backgroundColor: "#17B2FF",
    height: 35,
    alignSelf: "center",
    marginTop: 6,
  },
  rowView: {
    flexDirection: "row",
    // backgroundColor: "red",
    width: "100%",
    marginTop: 10,
    // justifyContent: "space-between",
    flexWrap: "wrap",
    // alignItems:'center',
    // justifyContent:"space-between",
    // paddingHorizontal: normalize(8),
    // borderWidth:1,
  },
  reportButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 15,
    backgroundColor: "#127DDD",
    height: 41,
    alignSelf: "center",
    marginTop: 10,
    marginRight: 3,
  },
  keyText: {
    color: "#6B6B6B",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 16,
  },
  valueStyle: {
    color: "#404040",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
    marginTop: 5,
  },
});
