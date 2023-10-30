// import React from "react";
// import { Image, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "./search.style";

// import { icons } from "../../../constants";

// const Search = ({ searchTerm, setSearchTerm, handleClick }) => {
//   return (
//     <View>
//       <View style={styles.searchContainer}>
//         <View style={styles.searchWrapper}>
//           <TextInput
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={(text) => setSearchTerm(text)}
//             placeholder="What are you looking for?"
//           />
//         </View>
//         <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
//           <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Search;

import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { icons } from "../../../constants";

const Search = () => {
  return (
    <View style={styles.searchBar}>
      <Image source={icons.search} style={styles.searchIcon} />
      <TextInput style={styles.textInput} placeholder="Search for doctors, medications, etc." />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#ECF0F3",
    borderRadius: 12,
  },
  searchIcon: { width: 24, height: 24, marginHorizontal: 10 },
  textInput: {
    flex: 1,
    padding: 10,
  },
});
