import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const CustomAutocompleteNew = ({ data, label, formValues, setFormValues, field }) => {
  const [oldPatientList, setOldPatientList] = useState([]);
  const filterData = (text) => {
    return data.filter((val) => val.name?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1);
  };

  const [showList, setShowList] = useState(false);
  const [text, onChangeText] = useState("");

  const Item = ({ item, field }) => (
    <Pressable
      onPress={() => {
        onChangeText(item.name);
        let newFormValues = { ...formValues };
        newFormValues[field] = item;
        setFormValues(newFormValues);
        setShowList(false);
      }}>
      <View style={{ padding: 10, color: "#fff" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "700" }}>{item.name}</Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 0.5,
            padding: 10,
            borderBottomColor: "#127DDD",
          }}></View>
      </View>
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        zIndex: 1,
      }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#127DDD",
          //padding: 3,
          backgroundColor: "#fff",
        }}>
        <TextInput
          onFocus={() => {
            setShowList(true);
            setOldPatientList(data);
          }}
          //onBlur={() => {setShowList(false);setOldPatientLis([]);}}
          placeholderTextColor="rgba(18, 125, 221, 0.75)"
          style={{
            fontWeight: "300",
            fontSize: 18,
            lineHeight: 21,
            color: "rgba(18, 125, 221, 0.75)",
          }}
          onChangeText={(val) => {
            onChangeText(val);
            if (val && val.length > 0) {
              setOldPatientList(filterData(val));
            } else if (val || val.length === 0) {
              setOldPatientList(data);
            }
            setShowList(true);
          }}
          value={text}
          placeholder={label}
        />
      </View>
      {showList && oldPatientList ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView
            nestedScrollEnabled={true}
            style={{
              //position: 'absolute',
              top: 5,
              maxHeight: 400,
              zIndex: 999,
              elevation: 112,
              opacity: 1,
              width: "100%",
              backgroundColor: "#fff",
              borderWidth: 1,
              borderRadius: 10,
            }}>
            {oldPatientList.map((item, index) => (
              <Item item={item} key={index} field={field} />
            ))}
          </ScrollView>

          <Pressable onPress={() => setShowList(false)}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                backgroundColor: "#127DDD",
                borderBottomEndRadius: 9,
                borderBottomStartRadius: 9,
              }}>
              <Text style={{ color: "#fff" }}>Close</Text>
            </View>
          </Pressable>
        </SafeAreaView>
      ) : null}
    </View>
  );
};

export default CustomAutocompleteNew;
