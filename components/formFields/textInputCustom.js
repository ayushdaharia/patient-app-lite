import React, { Fragment } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { colors } from "../../constants/themeOld";

const TextInputCustom = ({
  label,
  formValues,
  setFormValues,
  field,
  defaultValue,
  keyboardType,
  maxLength,
  editable,
  inputStyle,
}) => {
  return (
    <View
      style={{
        //flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
      }}>
      <TextInput
        style={[styles.textInputStyle, inputStyle]}
        placeholder={label}
        placeholderTextColor="#127DDD"
        onChangeText={(text) => setFormValues({ ...formValues, [field]: text })}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  );
};
export default TextInputCustom;
const styles = StyleSheet.create({
  fontWeight: "300",
  fontSize: 18,
  lineHeight: 21,
  color: "rgba(18, 125, 221, 0.75)",
});
