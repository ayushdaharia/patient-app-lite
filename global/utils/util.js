import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

export const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem("ACCESS_TOKEN", value);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("ACCESS_TOKEN");
  } catch (e) {
    // error reading value
  }
  return null;
};

export const getToken1 = async () => {
  const resolved = {
    token: null,
  };
  try {
    resolved.token = await AsyncStorage.getItem("ACCESS_TOKEN");
  } catch (e) {
    // error reading value
  }
  return resolved;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getStoredData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
  }
  return null;
};

export function getCurrentDateAndTimeFormatted(separator = "") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  let seconds = newDate.getSeconds();

  let m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let monthStr = m[month - 1];

  return `${date}${separator}${monthStr}${separator}${year}${separator}${hour}${":"}${minutes}`;
}

// export const openPDFFiles = async (url) => {
//   try {
//     if (typeof url !== "string") {
//       throw new Error("Invalid URL provided");
//     }
//     const f2 = url.split("/");
//     const fileName = f2[f2.length - 1];
//     const localFile = `${FileSystem.documentDirectory}/${fileName}`;
//     const options = {
//       fromUrl: url,
//       toFile: localFile,
//     };
//     const downloadResult = await FileSystem.downloadAsync(options);
//     if (downloadResult.status === 200) {
//       await FileViewer.open(localFile);
//     } else {
//       throw new Error("File download failed");
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// export async function openPDFFiles(url) {
//   try {
//     const f2 = url?.split("/");
//     const fileName = f2[f2?.length - 1];
//     const fileUri = `${FileSystem.documentDirectory}${fileName}.pdf`;
//     const remotePDFUrl = url; // Replace with the actual PDF URL

//     // Download the PDF file
//     const downloadResult = await FileSystem.downloadAsync(remotePDFUrl, fileUri);

//     if (downloadResult.status === 200) {
//       // If the download was successful, use Sharing to open the PDF
//       const result = await Sharing.openAsync(downloadResult.uri);
//       if (result.action === Sharing.sharedAction) {
//         console.log("PDF shared successfully");
//       } else {
//         // Handle errors or unsupported file types
//         console.error("Unable to open PDF");
//       }
//     } else {
//       // Handle download errors
//       console.error("Unable to download PDF");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// export const openPDFFiles = (url) => {
//   const abc = url;
// const f2 = url?.split("/");
// const fileName = f2[f2?.length - 1];
//   const fileExtention = url?.split(".")[3];
//   const localFile = `${RNFS?.DocumentDirectoryPath}/${fileName}`;
//   const options = {
//     fromUrl: url,
//     toFile: localFile,
//   };

//   RNFS?.downloadFile(options)
//     ?.promise?.then(() => FileViewer?.open(localFile))
//     ?.then(() => {
//       // success
//       // Here you can perform any of your completion tasks
//     })
//     .catch((error) => {
//       // error
//     });
// };

let isActivityInProgress = false;

export async function openPDFFiles(url) {
  let openResult;

  try {
    if (isActivityInProgress) {
      console.log("An activity is already in progress. Please wait.");
      return;
    }

    isActivityInProgress = true;

    const f2 = url.split("/");
    const fileName = f2[f2.length - 1];
    const fileUri = `${FileSystem.documentDirectory}${fileName}.pdf`;

    console.log({ fileUri });

    // Download the PDF file from the provided URL
    const downloadResult = await FileSystem.downloadAsync(url, fileUri);

    if (downloadResult.status === 200) {
      const uri = downloadResult.uri;
      console.log({ uri });

      console.log({ fileUri });
      console.log({ uri });

      openResult = await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: url,
        type: "application/pdf",
      });

      // if (Platform.OS === "android") {
      //   // Check if the device is Android and use a ContentProvider
      //   const fileUri = `content://${uri}`;
      //   openResult = await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      //     data: url,
      //     type: "application/pdf",
      //   });
      // } else {
      //   // For iOS and other platforms, use the direct file URI
      //   openResult = await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      //     data: uri,
      //     type: "application/pdf",
      //   });
      // }

      // if (openResult.action !== "android.intent.action.VIEW") {
      //   console.error("Unable to open PDF");
      // }
    }
    //  else {
    //   console.error("Unable to download PDF");
    // }

    isActivityInProgress = false;
  } catch (error) {
    console.error("Error:", error);
    isActivityInProgress = false;
  }
}
