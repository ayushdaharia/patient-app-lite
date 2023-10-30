import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const index = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  // const [loaded] = useFonts({
  // "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  // "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  // "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  // });

  if (!fontsLoaded) {
    // Font is not yet loaded, display an activity indicator
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return <Redirect href="/splash" />;
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
