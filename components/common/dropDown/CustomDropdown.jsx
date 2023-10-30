// import React, { useRef, useState } from "react";
// import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
// import PropTypes from "prop-types";
// import { COLORS, icons } from "../../../constants";

// const CustomDropdown = ({ heading, data, onSelect, placeholder, searchable }) => {
//   const [search, setSearch] = useState("");
//   const [clicked, setClicked] = useState(false);
//   const [filteredData, setFilteredData] = useState(data);
//   const [selectedItem, setSelectedItem] = useState("");
//   const searchRef = useRef();

//   const onSearch = (text) => {
//     setSearch(text);
//     if (text.trim() === "") {
//       setFilteredData(data);
//     } else {
//       const filteredItems = data.filter((item) => {
//         return Object.values(item).join(" ").toLowerCase().includes(text.toLowerCase());
//       });
//       setFilteredData(filteredItems);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Text>{heading}</Text>
//       <TouchableOpacity
//         style={{
//           width: "100%",
//           height: 40,
//           borderRadius: 10,
//           borderWidth: 0.5,
//           alignSelf: "center",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginVertical: 5,
//           paddingLeft: 15,
//           paddingRight: 15,
//         }}
//         onPress={() => {
//           setClicked(!clicked);
//         }}>
//         <Text style={{ fontWeight: "600" }}>
//           {selectedItem === "" ? placeholder : selectedItem}
//         </Text>
//         {clicked ? (
//           <Image source={icons.upChevron} style={{ width: 20, height: 20 }} />
//         ) : (
//           <Image source={icons.downChevron} style={{ width: 20, height: 20 }} />
//         )}
//       </TouchableOpacity>
//       {clicked ? (
//         <View
//           style={{
//             elevation: 5,
//             marginTop: 20,
//             alignSelf: "center",
//             width: "90%",
//             backgroundColor: "#fff",
//             borderRadius: 10,
//             borderWidth: 0.5,
//             borderColor: COLORS.lightWhite,
//           }}>
//           {searchable ? (
//             <TextInput
//               placeholder="Search.."
//               value={search}
//               ref={searchRef}
//               onChangeText={onSearch}
//               style={{
//                 width: "90%",
//                 height: 40,
//                 alignSelf: "center",
//                 borderWidth: 0.2,
//                 borderColor: "#8e8e8e",
//                 borderRadius: 7,
//                 marginTop: 20,
//                 paddingLeft: 20,
//               }}
//             />
//           ) : null}

//           <FlatList
//             data={filteredData}
//             renderItem={({ item }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: "85%",
//                     alignSelf: "center",
//                     height: 40,
//                     justifyContent: "center",
//                     borderBottomWidth: 0.5,
//                     borderColor: "#8e8e8e",
//                   }}
//                   onPress={() => {
//                     setSelectedItem(Object.values(item).join(" "));
//                     setClicked(false);
//                     onSearch("");
//                     onSelect(item);
//                   }}>
//                   <Text style={{ fontWeight: "600" }}>{Object.values(item).join(" ")}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       ) : null}
//     </View>
//   );
// };

// CustomDropdown.propTypes = {
//   data: PropTypes.array.isRequired,
//   onSelect: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
// };

// export default CustomDropdown;

import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Modal, FlatList } from "react-native";
import PropTypes from "prop-types";
import { COLORS, FONT, SIZES, icons } from "../../../constants";

const CustomDropdown = ({
  heading,
  data,
  onSelect,
  placeholder,
  searchable,
  borderRadius,
  height,
  color,
  selectedItemColor,
  headingColor,
}) => {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedItem, setSelectedItem] = useState("");
  const searchRef = useRef();

  const onSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredData(data);
    } else {
      const filteredItems = data.filter((item) => {
        return Object.values(item).join(" ").toLowerCase().includes(text.toLowerCase());
      });
      setFilteredData(filteredItems);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: headingColor ? headingColor : null }}>{heading}</Text>
      <TouchableOpacity
        style={{
          width: "100%",
          height: height ? height : 40,
          borderRadius: borderRadius ? borderRadius : 10,
          borderWidth: 0.5,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 5,
          paddingLeft: 15,
          paddingRight: 15,
        }}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={{ color: selectedItemColor ? selectedItemColor : null }}>
          {selectedItem === "" ? placeholder : selectedItem}
        </Text>
        {modalVisible ? (
          <Image source={icons.upChevron} style={{ width: 20, height: 20 }} />
        ) : (
          <Image source={icons.downChevron} style={{ width: 20, height: 20 }} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              elevation: 5,
              alignSelf: "center",
              width: "50%",
              backgroundColor: "#fff",
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: COLORS.lightWhite,
            }}>
            {searchable ? (
              <TextInput
                placeholder="Search.."
                value={search}
                ref={searchRef}
                onChangeText={onSearch}
                style={{
                  width: "90%",
                  height: 40,
                  alignSelf: "center",
                  borderWidth: 0.5,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  marginTop: 20,
                  paddingLeft: 20,
                }}
              />
            ) : null}

            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    width: "85%",
                    alignSelf: "center",
                    height: 40,
                    justifyContent: "center",
                    borderBottomWidth: 0.5,
                    borderColor: "#8e8e8e",
                  }}
                  onPress={() => {
                    setSelectedItem(Object.values(item).join(" "));
                    setModalVisible(false);
                    onSearch("");
                    onSelect(item);
                  }}>
                  <Text style={{ fontWeight: "600", color: color ? color : null }}>
                    {Object.values(item).join(" ")}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

CustomDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CustomDropdown;
