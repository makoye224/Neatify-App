import React, { useState } from "react";
import { StyleSheet, Image, View, Button, Text } from "react-native"; // Import the built-in Button component
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { forgot_password } from '../api/auth';
import ScrollableKeyboardAvoidView from "../config/ScrollableKeyboardAvoidView";
import routes from "../navigation/routes"; // Import your routes

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen({ navigation }) {
  const [error, setError] = useState();
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email}) => {
    //const body = JSON.stringify({ email });
    const result = await forgot_password(email);
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
    } else {
      navigation.navigate(routes.RESET_PASSWORD); 
    }
   
  };

  return (
    <ScrollableKeyboardAvoidView>
      <Screen style={styles.container}>
        <Text style={styles.heading}>
          Submit Your Email To Reset Password
        </Text>
        <Form
          initialValues={{ email: ""}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <SubmitButton title="Submit" />
        </Form>

        <View style={styles.buttonsContainer}>
          <Button
            title="Login"
            onPress={() => navigation.navigate(routes.LOGIN)} // Navigate to forgot password screen
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
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
