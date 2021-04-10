import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";

import {
  Foundation,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { THEME } from "../constants";
import FavoriteScreen from "../screens/FavoriteScreen";
import CartScreen from "../screens/CartScreen";
import HistoryScreen from "../screens/HistoryScreen";
import UserScreen from "../screens/UserScreen";
import { View, Text } from "react-native";

const BottomStack = createBottomTabNavigator();

export default function BottomTabs() {
  const [cart, setCart] = React.useState(7);
  return (
    <BottomStack.Navigator
      initialRouteName="Home"
      tabBarOptions={{ showLabel: false, style: { height: 70 } }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? THEME.primaryColor : "gray";
          switch (route.name) {
            case "Home":
              return <Foundation name="home" size={24} color={tintColor} />;
            case "Favorites":
              return (
                <MaterialIcons name="favorite" size={24} color={tintColor} />
              );
            case "Cart":
              return cart ? (
                <View
                  style={{
                    position: "absolute",
                    bottom: 35,
                    width: 70,
                    height: 70,
                    backgroundColor: THEME.primaryColor,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    shadowColor: "red",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                    elevation: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="cart"
                    size={24}
                    color={THEME.secondaryColor}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 50,
                      left: 40,
                      width: 25,
                      height: 25,
                      backgroundColor: THEME.red,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                      borderColor: "white",
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ color: "white" }}>{cart}</Text>
                  </View>
                </View>
              ) : (
                <MaterialCommunityIcons
                  name="cart"
                  size={24}
                  color={tintColor}
                />
              );
            case "History":
              return (
                <MaterialIcons
                  name="content-paste"
                  size={24}
                  color={tintColor}
                />
              );
            case "User":
              return <Entypo name="user" size={24} color={tintColor} />;
          }
        },
      })}
    >
      <BottomStack.Screen name="Home" component={HomeScreen} />
      <BottomStack.Screen name="Favorites" component={FavoriteScreen} />
      <BottomStack.Screen name="Cart" component={CartScreen} />
      <BottomStack.Screen name="History" component={HistoryScreen} />
      <BottomStack.Screen name="User" component={UserScreen} />
    </BottomStack.Navigator>
  );
}
