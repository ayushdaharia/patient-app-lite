import React, { Fragment } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { normalize } from "../../global/utils/dimensions";

const NewCustomTextInput = ({
  label,
  formValues,
  setFormValues,
  field,
  defaultValue,
  keyboardType,
  maxLength,
  editable,
  inputStyle,
  placeholder,
  onChangeText,
  value,
  right,
  left,
  name,
}) => {
  const styles = StyleSheet.create({
    textInputStyle: {
      borderColor: name === "emergencyNumber" && value?.length < 10 ? "red" : "black",
      borderWidth: 0.5,
      borderRadius: 5,
      color: "#127DDD",
      height: normalize(44),
      paddingLeft: normalize(8),
      flexDirection: "row",
    },
  });
  return (
    <View>
      <Text
        style={{
          color: "#6B6B6B",
          fontSize: 13,
          lineHeight: 18,
          fontWeight: "400",
          marginBottom: normalize(7),
          marginHorizontal: normalize(6),
        }}>
        {label}
      </Text>

      <View style={[styles.textInputStyle, inputStyle]}>
        {left !== undefined ? left() : null}
        <TextInput
          style={{
            color: "#777777",
          }}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          // onChangeText={(text) => setFormValues({ ...formValues, [field]: text })}
          onChangeText={onChangeText}
          // defaultValue={defaultValue}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={editable}
          value={value}
          right={null}
          left={null}
        />
        {right !== undefined ? right() : null}
      </View>
    </View>
  );
};
export default NewCustomTextInput;
