import React from "react";
import LottieView from "lottie-react-native";
import loading from "../../animation/loading.json";
import { Container } from "../../styles/StyledSplash";

const Loading = () => {
  return (
    <Container>
      <LottieView
        autoPlay
        loop={false}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // maxWidth: 380,
        }}
        source={loading}
      />
    </Container>
  );
};

export default Loading;
