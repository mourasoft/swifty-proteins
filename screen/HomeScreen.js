import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>home</Text>

      <Button title="Go to Auth" onPress={() => navigation.navigate("Auth")} />
      <Button
        title="Go to Splash"
        onPress={() => navigation.navigate("Splash")}
      />
      <Button
        title="Go to Viewer"
        onPress={() => navigation.navigate("Viewer")}
      />
    </View>
  );
};

export default HomeScreen;
