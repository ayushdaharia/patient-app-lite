import axios from "axios";
import { Resolver } from "../resolver/resolver";
import AsyncStorage from "@react-native-async-storage/async-storage";

///////*************************** */...GET APIs.../**********************///////

export async function saveData(url, obj) {
  const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  return await Resolver(
    axios.post(url, obj, { headers }, { timeout: 5000 }).then((res) => res.data)
  );
}

export async function updateData(url, obj) {
  const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  return await Resolver(
    axios.patch(url, obj, { headers }, { timeout: 5000 }).then((res) => res.data)
  );
}
