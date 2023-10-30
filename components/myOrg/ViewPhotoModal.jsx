import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { screenWidth, screenHeight } from "../../../utils/dimensions";
import CustomModalWrapper from "./CustomModal";
import Pdf from "react-native-pdf";
import { openPDFFiles } from "../../../utils/util";

const ViewPhotoModal = (props) => {
  const fileExtension = props?.image?.split(".").pop()?.toLowerCase();
  console.log("props", fileExtension);

  const closeModalPhoto = () => {
    setTimeout(() => {
      props?.handlephotoModalVisible(false);
    }, 100);
  };

  return (
    <CustomModalWrapper
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      onCloseModel={() => props?.handlephotoModalVisible(false)}
      modalCustomStyle={styles.modalCustomStyle}
      isVisible={props?.photoModalVisible}>
      <View style={styles.photoModalVisible}>
        <TouchableOpacity style={styles.crossIcon} onPress={closeModalPhoto} activeOpacity={0.8}>
          <Image style={styles.crossIcon} source={require("../../../assets/images/png/x.png")} />
        </TouchableOpacity>

        {fileExtension === "n/a" ? (
          <View style={styles.noDocsFound}>
            <Text style={styles.noDocsText}>{"No Document"}</Text>
          </View>
        ) : fileExtension === "pdf" ? (
          <Pdf
            trustAllCerts={false}
            source={{ uri: props.image, cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: screenHeight,
            }}
          />
        ) : (
          <Image style={styles.mainPhoto} source={{ uri: props.image }} />
        )}

        {/* {
        fileExtension === "jpg" ||
        fileExtension === "png" ||
        fileExtension === "jpeg" ? (
          <Image style={styles.mainPhoto} source={{ uri: props.image }} />
        ) 
        : 
        (
          <Pdf
            trustAllCerts={false}
            source={{ uri: props.image, cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={{
              flex: 1,
              width: "100%",
              height: screenHeight,
            }}
       
          />
        )
        } */}

        {/* <Image style={styles.mainPhoto} source={{ uri: props.image }} /> */}
      </View>
    </CustomModalWrapper>
  );
};

export default React.memo(ViewPhotoModal);

const styles = StyleSheet.create({
  crossIcon: {
    height: 32,
    width: 32,
    marginBottom: 20,
    alignSelf: "center",
  },
  photoModalVisible: {
    flex: 1,
  },
  modalCustomStyle: { margin: 0, backgroundColor: "white" },
  mainPhoto: {
    flex: 1,
    width: screenWidth,

    maxHeight: screenHeight - 55,
    backgroundColor: "white",

    resizeMode: "contain",
  },
  noDocsFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDocsText: {
    color: "black",
    fontSize: 14,
  },
});
