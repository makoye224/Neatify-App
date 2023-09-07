import React, { useState, useEffect } from "react";
import { ScrollView, KeyboardAvoidingView, Platform, Keyboard } from "react-native";

function ScrollableKeyboardAvoidView({ children }) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  const handleKeyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    setKeyboardOffset(keyboardHeight);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOffset(0);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={keyboardOffset}
      >
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ScrollableKeyboardAvoidView;
