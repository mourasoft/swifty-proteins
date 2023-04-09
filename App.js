import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen, HomeScreen, SplashScreen, ViewerScreen } from "./screen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Viewer" component={ViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = () => {
  return (
    <Container>
      <Texts>hi amine helo</Texts>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const Texts = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;
