import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Button, Alert, AppState } from "react-native";
import Science from "../assets/science.png";
import * as LocalAuthentication from "expo-local-authentication";
import styled from "styled-components";
import useIsPortrait from "../hooks/useIsPortrait";

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

  const orientation = useIsPortrait();
  console.log("orientation", orientation);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container orientation={orientation}>
        {orientation === "portrait" ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title>swifty-proteins</Title>
              <ImageContainer scale={0.4} source={Science} />

              <SubTitle>
                Transform your understanding of proteins with Swifty Protein
              </SubTitle>
              <Button title="Login" onPress={handleLogin} />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageContainer scale={0.4} source={Science} />
            </View>
            <View
              style={{
                flex: 1,
                height: 100,
              }}
            >
              <Title>swifty-proteins</Title>

              <SubTitle>
                Transform your understanding of proteins with Swifty Protein
              </SubTitle>
              <Button title="Login" onPress={handleLogin} />
            </View>
          </>
        )}
      </Container>
    </SafeAreaView>
  );
};

export default AuthScreen;

const Container = styled.View`
  flex: 1;
  flex-direction: ${(props) =>
    props.orientation === "portrait" ? "column" : "row"};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  opacity: 0.5;
`;

const ImageContainer = styled.Image`
  transform: scale(${(props) => props.scale});
  /* border: 1px solid black; */
`;
