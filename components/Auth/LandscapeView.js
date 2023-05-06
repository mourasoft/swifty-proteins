import React from "react";
import { View, Button } from "react-native";
import { Title, SubTitle, ImageContainer } from "../../styles/StyledAuth";
import Science from "../../assets/science.png";

const LandscapeView = () => {
  return (
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
  );
};

export default LandscapeView;
