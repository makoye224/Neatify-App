import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import routes from "../navigation/routes";
import ScrollableKeyboardAvoidView from "../config/ScrollableKeyboardAvoidView";

function WelcomeScreen({ navigation }) {
  return (
    <>
   
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.tagline}>We Make Your Space Neat!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
 
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 60,
    width: "120%",
  },
  logo: {
    width: 370,
    height: 300,
  },
  logoContainer: {
    position: "absolute,",
    top: -250,
    alignItems: "center",
  
  },
  tagline: {
    fontSize: 25,
    fontWeight: "400",
    color: 'purple',
    top: -70,
  },
});

export default WelcomeScreen;
