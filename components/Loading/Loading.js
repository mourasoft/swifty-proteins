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
          width: "100%",
          height: "auto",
          maxWidth: 380,
        }}
        source={loading}
      />
    </Container>
  );
};

export default Loading;
