import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import useIsPortrait from "../hooks/useIsPortrait";
import PortraitView from "../components/Auth/PortraitView";
import LandscapeView from "../components/Auth/LandscapeView";
import { Container } from "../styles/StyledAuth";

const AuthScreen = ({ navigation }) => {
  const backAuth = () => {
    navigation.replace("Auth");
    return true;
  };
  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      if (state === "inactive" || state === "background") backAuth();
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const options = {
        promptMessage: "Scan your fingerprint to use this app",
        fallbackLabel: "Enter your device password to use this app",
        disableDeviceFallback: false,
        cancelLabel: "Cancel",
        maxAttempts: 3,
        fallbackToPasscode: true,
      };
      const authenticated = await LocalAuthentication.authenticateAsync(
        options
      );
      console.log("auth", authenticated);
      if (authenticated.success) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert(
          "Authentication failed in else method",
          authenticated.warning
        );
      }
    } catch (error) {
      Alert.alert("Authentication failed in catch method");
    }
  };

  const orientation = useIsPortrait();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container orientation={orientation}>
        {orientation === "portrait" ? (
          <PortraitView handleLogin={handleLogin} />
        ) : (
          <LandscapeView handleLogin={handleLogin} />
        )}
      </Container>
    </SafeAreaView>
  );
};

export default AuthScreen;
