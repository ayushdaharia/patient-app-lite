// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { COLORS, FONT, SIZES, icons } from "../../../constants";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const CustomDate = ({ heading, setFormValues, date, borderRadius, height, headingColor }) => {
//   const [dateValue, setDateValue] = useState(date ? new Date(date) : new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   const hideDatePicker = () => {
//     setShowDatePicker(false);
//   };

//   const onChange = (event, selectedDate) => {
//     if (event.type === "set") {
//       setDateValue(selectedDate);
//       setFormValues({ ...setFormValues, date: selectedDate });
//       hideDatePicker();
//     } else {
//       hideDatePicker();
//     }
//   };

//   return (
//     <View>
//       <Text style={{ color: headingColor ? headingColor : null }}>{heading}</Text>
//       <View
//         style={{
//           height: height ? height : 40,
//           padding: 10,
//           fontSize: SIZES.small,
//           marginVertical: 5,
//           borderColor: COLORS.gray,
//           borderWidth: 1,
//           borderRadius: borderRadius ? borderRadius : 10,
//           width: 130,
//         }}>
//         <TouchableOpacity
//           onPress={showDatepicker}
//           style={{ flexDirection: "row", alignItems: "center" }}>
//           <Text>{dateValue.toLocaleDateString()}</Text>
//           <Image
//             source={icons.calendarBlue}
//             style={{ height: 20, width: 20, marginLeft: 10 }}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker value={dateValue} mode={"date"} is24Hour={true} onChange={onChange} />
//         )}
//       </View>
//     </View>
//   );
// };

// export default CustomDate;

// const styles = StyleSheet.create({});

import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, FONT, SIZES, icons } from "../../../constants";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDate = ({
  heading,
  formValues,
  setFormValues,
  propertyName,
  borderRadius,
  height,
  headingColor,
}) => {
  const [dateValue, setDateValue] = useState(
    formValues[propertyName] ? new Date(formValues[propertyName]) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      setDateValue(selectedDate);
      setFormValues({ ...formValues, [propertyName]: selectedDate });
      hideDatePicker();
    } else {
      hideDatePicker();
    }
  };

  return (
    <View>
      <Text style={{ color: headingColor ? headingColor : null }}>{heading}</Text>
      <View
        style={{
          height: height ? height : 40,
          padding: 10,
          fontSize: SIZES.small,
          marginVertical: 5,
          borderColor: COLORS.gray,
          borderWidth: 1,
          borderRadius: borderRadius ? borderRadius : 10,
          width: 130,
        }}>
        <TouchableOpacity
          onPress={showDatepicker}
          style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{dateValue.toLocaleDateString()}</Text>
          <Image
            source={icons.calendarBlue}
            style={{ height: 20, width: 20, marginLeft: 10 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={dateValue} mode={"date"} is24Hour={true} onChange={onChange} />
        )}
      </View>
    </View>
  );
};

export default CustomDate;

const styles = StyleSheet.create({});
