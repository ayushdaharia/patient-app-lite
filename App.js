import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { ContextPrimary } from "./global/context/context";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // Font is not yet loaded, display an activity indicator
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const [profileimg, setProfileimg] = useState("");
  const [userName, setUserName] = useState("");

  const changeImg = (value) => {
    setProfileimg(value);
  };

  const changeName = (value) => {
    setUserName(value);
  };

  return (
    <ContextPrimary.Provider
      value={{
        dashboard: "dashboard",
        profileimg,
        changeImg,
        userName,
        changeName,
      }}>
      <View style={styles.container}>
        <Text style={{ fontFamily: "Poppins-Bold" }}>
          Open up App.js to start working on your app!
        </Text>
        <StatusBar style="auto" />
      </View>
    </ContextPrimary.Provider>
  );
}

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
