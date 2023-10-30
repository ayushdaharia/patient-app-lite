import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable } from "react-native";
import { icons } from "../../constants";

const Dropdown = ({
  options,
  selectedOption,
  onOptionSelect,
  defaultOption,
  ContainerStyle,
  textStyles,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleOptionSelect = (option) => {
    // console.log("opp",option);
    onOptionSelect(option);
    toggleDropdown();
  };
  return (
    <View style={{ flex: 1 }}>
      <Pressable style={[styles.container, ContainerStyle]} onPress={toggleDropdown}>
        <Text style={[styles.textStyle, textStyles]}>
          {selectedOption === "" ? defaultOption : selectedOption}
        </Text>
        <Image
          source={icons.chevronDown}
          style={{
            width: 20,
            height: 20,
            tintColor: "#404040",
            transform: [{ rotate: isDropdownVisible ? "180deg" : "0deg" }],
          }}
        />
      </Pressable>
      {isDropdownVisible && (
        <View style={styles.dropdownStyle}>
          {options.map((item, index) => (
            <Pressable
              key={index}
              style={styles.itemStyle}
              onPress={() => handleOptionSelect(item.value)}>
              <Text
                style={{
                  fontWeight: "700",
                  textAlign: "right",
                  color: "#127DDD",
                }}>
                {item.value}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
const styles = StyleSheet.create({
  container: {
    width: "40%",
    height: 50,
    borderColor: "#127DDD",
    borderBottomWidth: 0.5,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownStyle: {
    alignSelf: "flex-end",
    width: "90%",
    backgroundColor: "#fff",
  },
  itemStyle: {
    width: "85%",
    alignSelf: "center",
    height: 30,
    justifyContent: "center",
  },
  textStyle: {
    fontWeight: "600",
    color: "#127DDD",
  },
});
