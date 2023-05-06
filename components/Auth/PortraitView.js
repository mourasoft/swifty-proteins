import React from "react";
import { View, Button } from "react-native";
import { Title, SubTitle, ImageContainer } from "../../styles/StyledAuth";
import Science from "../../assets/science.png";

const PortraitView = ({ handleLogin }) => {
  return (
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
  );
};

export default PortraitView;
