import axios from "axios";
import { Resolver } from "../resolver/resolver";

export async function getUserToken(url, data) {
  return await Resolver(
    axios(url, {
      method: "POST",
      data: data,
    }).then((res) => res.data)
  );
}

export async function getOTPByMobile(url, data) {
  return await Resolver(
    axios(url, {
      method: "POST",
      data: data,
    }).then((res) => res.data)
  );
}

export async function logout(url, obj) {
  return await Resolver(
    axios(url, {
      method: "POST",
      data: obj,
    }).then((res) => res.data)
  );
}
