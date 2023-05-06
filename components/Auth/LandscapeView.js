import React from "react";
import { View, Text } from "react-native";
import {
  Title,
  SubTitle,
  ImageContainer,
  StyledBtn,
} from "../../styles/StyledAuth";
import Science from "../../assets/science.png";

const LandscapeView = ({ handleLogin }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageContainer scale={1} source={Science} />
      </View>
      <View
        style={{
          flex: 1,
          // height: 100,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Title>swifty-proteins</Title>

        <SubTitle>
          Transform your understanding of proteins with Swifty Protein
        </SubTitle>
        <StyledBtn onPress={handleLogin}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            login
          </Text>
        </StyledBtn>
      </View>
    </>
  );
};

export default LandscapeView;
