import React from "react";
import { Text, View } from "react-native";
import styles from "./emergencyServices.style";
import ServicesCard from "../../common/cards/servicesCard/ServicesCard";
import { images } from "../../../constants";

const serviceData = [
  { img: images.heartattack, title: "Heart Attack" },
  { img: images.burn, title: "Burn" },
  { img: images.amputee, title: "Amputation " },
  { img: images.medicalcare, title: "Critical" },
  { img: images.patient, title: "Accident" },
];

const EmergencyServices = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Emergency Services</Text>
      </View>
      <View style={styles.cardContainer}>
        {serviceData.map((item, index) => (
          <ServicesCard key={index} data={item} />
        ))}
      </View>
    </View>
  );
};

export default EmergencyServices;
