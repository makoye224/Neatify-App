import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.inputContainer}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
        )}
        <TextInput
          placeholderTextColor={defaultStyles.colors.medium}
          {...otherProps}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    paddingVertical: 10, // Adjust padding for a more balanced look
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center", 
    height: 40,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, // Expand the input to fill remaining space
    fontSize: 18,
    color: defaultStyles.colors.dark,
  },
});

export default AppTextInput;
