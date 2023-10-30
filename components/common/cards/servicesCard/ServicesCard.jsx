import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { FONT, SIZES, images } from "../../../../constants";

const ServicesCard = ({ data, other }) => {
  return (
    <TouchableOpacity style={styles.container(other)}>
      <View style={styles.innerContainer}>
        <Image source={data.img} resizeMode="contain" style={styles.logoImage(other)} />
        <Text style={styles.serviceName}>{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServicesCard;

const styles = StyleSheet.create({
  container: (other) => ({
    margin: 5,
    width: "30%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#C8DDF0",
    height: 105.5,
    display: other ? "flex" : null,
    flexDirection: other ? "column" : null,
    justifyContent: other ? "flex-end" : null, // Align text at the bottom of the container
  }),
  innerContainer: {
    marginTop: 10,
  },
  logoImage: (other) => ({
    width: "100%",
    height: other ? 60 : 70,
  }),
  serviceName: {
    textAlign: "center",
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: "#000000",
    paddingHorizontal: 4,
    marginVertical: 4,
    height: 35,
  },
});
