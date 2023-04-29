import React from "react";
import LottieView from "lottie-react-native";
import { Text } from "react-native";
import noData from "../../animation/ligand_not_found.json";
import { Container } from "../../styles/StyledSplash";
import styled from "styled-components";

const NoData = ({ query }) => {
  return (
    <Container>
      <NotFound>{`${query} not found :(`}</NotFound>
      <LottieView
        autoPlay
        loop={true}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: 380,
        }}
        source={noData}
      />
    </Container>
  );
};

export default NoData;

const NotFound = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin-top: 50px;
`;
