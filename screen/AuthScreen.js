import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import useIsPortrait from "../hooks/useIsPortrait";
import PortraitView from "../components/Auth/PortraitView";
import LandscapeView from "../components/Auth/LandscapeView";

import { Container } from "../styles/StyledAuth";

const AuthScreen = ({ navigation, shareRef }) => {
  let appState = AppState.currentState;

  const backAuth = () => {
    navigation.replace("Auth");
    return true;
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState === "active" &&
        nextAppState.match(/inactive|background/) &&
        !shareRef.current
      ) {
        backAuth();
      }
      appState = nextAppState;
    };

    AppState.addEventListener("change", handleAppStateChange);
  }, []);

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

      if (authenticated.success) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert(
          "Authentication failed in else method",
          authenticated.warning
        );
      }
    } catch (error) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
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
