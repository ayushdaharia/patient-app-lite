import React, { Fragment } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors } from "../../constants/themeOld";

const TextCustom = ({ field, formValues, value, customStyle, textStyle }) => {
  const display = value ? value : formValues[field];

  styles = StyleSheet.create({
    box: customStyle || {
      //flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
    },
    text: textStyle || {
      fontWeight: "300",
      fontSize: 18,
      lineHeight: 21,
      color: "rgba(18, 125, 221, 0.75)",
      paddingVertical: 15,
    },
  });

  return (
    <View style={styles.box}>
      <Text style={styles.text}>{display}</Text>
    </View>
  );
};
export default TextCustom;
