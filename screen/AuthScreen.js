import React, { useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  AppState,
  BackHandler,
  Image,
  SafeAreaView,
} from "react-native";
import Science from "../assets/science.png";
import * as LocalAuthentication from "expo-local-authentication";
import styled from "styled-components";

const AuthScreen = ({ navigation }) => {
  const backAuth = () => {
    navigation.replace("Auth");
    return true;
  };
  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      console.log("state", state);
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
  return (
    <SafeAreaView>
      <Container>
        <Title>swifty-proteins</Title>

        <ImageContainer scale={0.75} source={Science} />

        <Text>
          Transform your understanding of proteins with Swifty Protein
        </Text>
        <Button title="Sign in with Face ID" onPress={handleLogin} />
      </Container>
    </SafeAreaView>
  );
};

export default AuthScreen;

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  font-family: "rimouski";
`;

const SubTitle = styled.Text``;

const ImageContainer = styled.Image`
  transform: scale(${(props) => props.scale});
`;
