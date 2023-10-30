import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, title }) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)} />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeaderBtn;
