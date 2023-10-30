import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./latest.style";
import { images } from "../../../constants";

const Latest = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Latest</Text>
      </View>

      <View style={styles.bannerContainer}>
        <Image source={images.banner} resizeMode="contain" style={styles.banner} />
      </View>
    </View>
  );
};

export default Latest;
