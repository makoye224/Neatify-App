import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import * as SplashScreen from 'expo-splash-screen';


export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding
        await restoreUser(); // Restore user data
        setIsReady(true); // Set the app as ready
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    };

    initializeApp();
  }, []); // Empty dependency array ensures this runs once on component mount

  if (!isReady) {
    return null; // Return null while the app is initializing
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
