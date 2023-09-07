import React, { useState } from "react";
import { StyleSheet, Image, View, Button } from "react-native"; // Import the built-in Button component
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import ScrollableKeyboardAvoidView from "../config/ScrollableKeyboardAvoidView";
import routes from "../navigation/routes"; // Import your routes

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result?.data?.access);
  };

  return (
    <ScrollableKeyboardAvoidView>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
        </Form>

        <View style={styles.buttonsContainer}>
          <Button
            title="Forgot Password?"
            onPress={() => navigation.navigate(routes.FORGOT_PASSWORD)} // Navigate to forgot password screen
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate(routes.REGISTER)} // Navigate to register screen
          />
        </View>
      </Screen>
    </ScrollableKeyboardAvoidView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 300,
    height: 140,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default LoginScreen;
