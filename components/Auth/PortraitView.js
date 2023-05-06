import React from "react";
import { View, Text } from "react-native";
import {
  Title,
  SubTitle,
  ImageContainer,
  StyledBtn,
} from "../../styles/StyledAuth";
import Science from "../../assets/science.png";

const PortraitView = ({ handleLogin }) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Title>swifty-proteins</Title>
        <ImageContainer
          scale={1}
          source={Science}
          // style={{ borderWidth: 1, borderColor: "black" }}
        />

        <SubTitle>
          Transform your understanding of proteins with Swifty Protein
        </SubTitle>
        <StyledBtn title="Login" onPress={handleLogin}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            login
          </Text>
        </StyledBtn>
      </View>
    </>
  );
};

export default PortraitView;
