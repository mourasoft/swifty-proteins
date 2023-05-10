import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import splashLogo from "../animation/data.json";
import { Container } from "../styles/StyledSplash";
import * as LocalAuthentication from "expo-local-authentication";
const SplashScreen = ({ navigation }) => {
  async function checkBiometricSupport() {
    // check if the device has biometric support and if the user has enrolled any fingerprints
    const Auth = LocalAuthentication.getEnrolledLevelAsync();

    const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
    const hasBiometricData = await LocalAuthentication.isEnrolledAsync();
    if (!hasBiometricHardware || !hasBiometricData) {
      return false;
    }
    return true;
  }
  useEffect(() => {
    checkBiometricSupport().then((isBiometricSupported) => {
      if (isBiometricSupported) {
        setTimeout(() => {
          navigation.replace("Auth");
        }, 6000); // Set a delay of 6 seconds (adjust as necessary)
      } else {
        // ... go to home screen if biometric is not supported
        setTimeout(() => {
          navigation.replace("Home");
        }, 6000); // Set a delay of 6 seconds (adjust as necessary)
      }
    });
  }, []);
  return (
    <Container>
      <LottieView
        autoPlay
        loop={false}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={splashLogo}
      />
    </Container>
  );
};

export default SplashScreen;
