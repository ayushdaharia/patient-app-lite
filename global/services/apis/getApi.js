import axios from "axios";
import { Resolver } from "../resolver/resolver";
import AsyncStorage from "@react-native-async-storage/async-storage";

///////*************************** */...GET APIs.../**********************///////

export async function getData(url) {
  const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  return await Resolver(axios.get(url, { headers }).then((res) => res.data));
}

// export async function getDataResult(url,healthid) {
//   let headers={}
//   console.log("health==========++++++",healthid);
//   // const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
//   AsyncStorage.getItem("ACCESS_TOKEN").then((res)=>{
//     console.log("restokeemmmm",res);
//     headers={
//       "Content-Type": "application/json",
//         Authorization: `Bearer ${res}`,
//         phrAddress:"abhishek1568@sbx"
//     }
//   console.log("finala healder",headers);
//   })

// const value = await AsyncStorage.getItem("PHR_ADR")

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${access_token}`,
//   phrAddress:"abhishek1568@sbx"
// };
//   return await Resolver(axios.get(url, { headers }).then((res) => res.data));
// }

export async function getDataresults(url, healthid) {
  console.log("headerson api", healthid);
  const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
    phrAddress: `${healthid}`,
  };
  return await Resolver(axios.get(url, { headers }).then((res) => res.data));
}
// export async function getDataResult(url) {
//   const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };
//   return await Resolver(axios.get(url, { headers }).then((res) => res));
// }

// export const getDataWithBody = async (
//   url,
//   data,
//   successCallback,
//   failureCallback
// ) => {
//   let databody = JSON.stringify({
//     phrAddress: "abhishek117@sbx",
//   });
//   console.log("kkkk", data);
//   const access_token = await AsyncStorage.getItem("ACCESS_TOKEN");
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${access_token}`,
//   };
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: url,
//     headers: headers,
//     data: databody,
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       successCallback(response);
//     })
//     .catch((error) => {
//       failureCallback(error);
//     });
// };

// export const getBody = () => {
//   let data = JSON.stringify({
//     phrAddress: "abhishek117@sbx",
//   });

//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "https://apna-clinic.com/auth/profile",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0bmV3QGVjaGlraXRzYWxheWEuY29tIiwiY2xpbmljSWQiOiI0N2Y0ZmNhOS05YzI5LTRkMjEtOWMxMC1jM2QzODE1YmJmNTAiLCJwaGFybWFjeUlkIjoiYTc2ZjQ2MzAtN2MyMi00ZjIyLWI0ODgtNWY4YzkzYmQ5N2Y5Iiwicm9sZSI6IkFETUlOIiwibGFiSWQiOiIwYjcwZDVmYy00OWUzLTQ5YjYtOTVjNy0wYThjZjRlNzIzMTMiLCJuYW1lIjoiQXl1c2giLCJicmFuY2hOYW1lIjoiVGVzdCBicmFuY2giLCJleHAiOjE2OTI4NjA2NjYsInVzZXJJRCI6IjI1MjE2NDU3LWNkYjYtNGI3OS05YzU1LTBlODIxOWY4OTkxNyIsImlhdCI6MTY4NTA4NDY2Nn0.Q2lCF2BN-zKpZHLu1_Ik8f2ft-QpY6ayMrMQ7NkwrxEgpG6nkR_WAoFAEY4Uxghimz8aq2G7H3pj6HGQ-J2E2Q",
//     },
//     data: data,
//   };

//   axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// export const getApiWithBodyCall = async (
//   url,
//   body,
//   successCallback,
//   errorCalback
// ) => {
//   // try {
//     const access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${access_token}`,
//     };
//     return await Resolver(axios.get(url, { headers },body).then((res) =>  console.log(res.data)).catch((error)=>console.log("error",error)));
//     const response = await axios.get(url, {

//       headers: headers,

//     },
//     {
//       data:body
//     }

//     );

//     successCallback(response);
//   // }
//   // // catch (error) {
//   // //   errorCalback(error);
//   // // }

//   //     .catch((error) => {
//   //       if (error.code === 'ECONNABORTED') {
//   //         let payload = {
//   //           data: {
//   //             statusCode: 408,
//   //           },
//   //         };
//   //         errorCalback(payload);
//   //       }
//   // else if (error.response) {
//   //         handleApiError(error.response);
//   //         errorCalback(error.response);
//   //       } else if (!error.response) {
//   //         let payload = {
//   //           data: {
//   //             statusCode: '',
//   //           },
//   //         };
//   //         handleApiError(error);
//   //         errorCalback(payload);
//   //       }
//   //     });
// };
