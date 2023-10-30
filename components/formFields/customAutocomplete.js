import { View, TextInput } from "react-native";
import { Menu } from "react-native-paper";
import React, { useState } from "react";

const CustomAutocomplete = ({
  label,
  data,
  onChange: origOnChange,
  icon = "bike",
  menuStyle = {},
  formValues,
  setFormValues,
  field,
}) => {
  const [value, setValue] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (text) => {
    return data.filter((val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1);
  };

  return (
    // <View style={[containerStyle]}>
    //     <TextInput
    //         onFocus={() => {
    //             if (!value || value === "") {
    //                 setMenuVisible(true);
    //             }
    //         }}
    //         // onBlur={() => setMenuVisible(false)}
    //         label={label}
    //         right={right}
    //         left={left}
    //         style={style}
    //         onChangeText={(text) => {
    //             // origOnChange(text);
    //             if (text && text.length > 0) {
    //                 setFilteredData(filterData(text));
    //             } else if (text && text.length === 0) {
    //                 setFilteredData(data);
    //             }

    //             let newFormValues = { ...formValues };
    //             newFormValues[field] = text;
    //             setFormValues(newFormValues);

    //             setMenuVisible(true);
    //             setValue(text);
    //         }}
    //         value={value}
    //     />
    //     {menuVisible && filteredData && (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 backgroundColor: "white",
    //                 borderWidth: 2,
    //                 flexDirection: "column",

    //             }}>
    //             {filteredData.map((datum, i) => (
    //                 <Menu.Item
    //                     key={i}
    //                     style={[{ width: "100%" }, menuStyle]}
    //                     icon={icon}
    //                     onPress={() => {
    //                         setValue(datum);

    //                         let newFormValues = { ...formValues };
    //                         newFormValues[field] = datum;
    //                         setFormValues(newFormValues);

    //                         setMenuVisible(false);
    //                     }}
    //                     title={datum}
    //                 />
    //             ))}
    //         </View>
    //     )}
    // </View>
    <View>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
        }}
        onFocus={() => {
          if (!value || value === "") {
            setMenuVisible(true);
          }
        }}
        // onBlur={() => setMenuVisible(false)}
        label={label}
        // right={right}
        // left={left}
        // style={style}
        onChangeText={(text) => {
          // origOnChange(text);
          if (text && text.length > 0) {
            setFilteredData(filterData(text));
          } else if (text && text.length === 0) {
            setFilteredData(data);
          }

          let newFormValues = { ...formValues };
          newFormValues[field] = text;
          setFormValues(newFormValues);

          setMenuVisible(true);
          setValue(text);
        }}
        value={value}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderWidth: 0.5,
            borderTopWidth: 0,
            borderRadius: 10,
            flexDirection: "column",
          }}>
          {filteredData.map((datum, i) => (
            <Menu.Item
              key={i}
              style={[{ width: "100%" }, menuStyle]}
              icon={icon}
              onPress={() => {
                setValue(datum);

                let newFormValues = { ...formValues };
                newFormValues[field] = datum;
                setFormValues(newFormValues);

                setMenuVisible(false);
              }}
              title={datum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomAutocomplete;
