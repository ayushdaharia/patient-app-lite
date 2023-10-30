import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // marginTop: SIZES.xSmall,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  bannerContainer: {
    // marginTop: SIZES.small,
  },
  banner: {
    width: "100%",
    height: 200,
  },
});
export default styles;
