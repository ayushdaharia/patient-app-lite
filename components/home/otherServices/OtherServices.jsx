import React from "react";
import { Text, View } from "react-native";
import styles from "./otherservices.style";
import ServicesCard from "../../common/cards/servicesCard/ServicesCard";
import { images } from "../../../constants";

const serviceData = [
  { img: images.ohcMgmt, title: "OHC Management" },
  { img: images.dr, title: "Availabilties of MMBS/AFIH Doctors" },
  { img: images.staff, title: "Paramedical Staff" },
  { img: images.medicine, title: "Medicines" },
  { img: images.ohcEquip, title: "OHC Equipment" },
  { img: images.ahc, title: "Annual Health Examination" },
  { img: images.preEmployement, title: "Pre-employment Examination" },
  { img: images.gi, title: "Group Insurance" },
  { img: images.healthInsurance, title: "Health Awareness Sessions" },
  { img: images.csr, title: "Corporate Social  Responsibility" },
  { img: images.digitisation, title: "Digitisation of Medical Records" },
  // { img: images.ohcMgmt2, title: "OHC Management" },
  // { img: images.dr2, title: "Availabilties of MMBS/AFIH Doctors" },
  // { img: images.staff2, title: "Paramedical Staff" },
  // { img: images.medicine2, title: "Medicines" },
  // { img: images.ohcEquip2, title: "OHC Equipment" },
  // { img: images.ahc2, title: "Annual Health Examination" },
  // { img: images.preEmployement2, title: "Pre-employment Examination" },
  // { img: images.gi2, title: "Group Insurance" },
  // { img: images.healthInsurance2, title: "Health Awareness Sessions" },
  // { img: images.csr2, title: "Corporate Social  Responsibility" },
  // { img: images.digitisation2, title: "Digitisation of Medical Records" },
];

const OtherServices = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Other Corporate Services</Text>
      </View>
      <View style={styles.cardContainer}>
        {serviceData.map((item, index) => (
          <ServicesCard key={index} data={item} other={true} />
        ))}
      </View>
    </View>
  );
};

export default OtherServices;
