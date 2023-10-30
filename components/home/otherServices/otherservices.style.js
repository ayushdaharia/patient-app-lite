import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xSmall,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  cardContainer: {
    marginTop: SIZES.small,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default styles;
