import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen, HomeScreen, SplashScreen, ViewerScreen } from "./screen";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { useRef } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const shareRef = useRef(false);

  if (status === null) {
    requestPermission();
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false, orientation: "portrait" }}
        />
        <Stack.Screen
          name="Auth"
          // component={AuthScreen}
          options={{ headerShown: false }}
        >
          {(props) => <AuthScreen {...props} shareRef={shareRef} />}
        </Stack.Screen>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Viewer">
          {(props) => <ViewerScreen {...props} shareRef={shareRef} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
