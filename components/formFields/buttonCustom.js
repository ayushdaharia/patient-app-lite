import React, { Fragment } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/themeOld";

const ButtonCustom = ({ onPress, label, style }) => {
  return (
    <View
      style={{
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
      }}>
      <Pressable onPress={onPress}>
        <View
          style={{
            backgroundColor: colors.primary,
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            ...style,
          }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              lineHeight: 30,
              color: colors.white,
            }}>
            {label}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
export default ButtonCustom;
