import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./navigation/tabs";
import { useFonts, Roboto_900Black } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";

import { ICONS, THEME } from "./constants";
import { View, Text } from "react-native";
import ImageIcon from "./components/ImageIcon";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={BottomTabs}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: THEME.primaryColor,
                      fontFamily: "Roboto_900Black",
                    }}
                  >
                    X
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: THEME.secondaryColor,
                      fontFamily: "Roboto_900Black",
                    }}
                  >
                    E
                  </Text>
                </View>
              );
            },
            headerStyle: {
              elevation: 0,
              backgroundColor: THEME.lightWhite,
            },
            headerLeft: () => {
              return <ImageIcon source={ICONS.fourDots} />;
            },
            headerRight: () => {
              return (
                <ImageIcon
                  source={ICONS.search}
                  style={{ paddingRight: THEME.padding }}
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
