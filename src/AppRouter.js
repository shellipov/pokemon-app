import React, { useState } from "react";
import { Text } from "react-native";
import { mainStyles } from "../styles/styles";
import {  fonts } from "../styles/styles";
import PostList from "./PostList";
import Search from "../pages/Search";
import Settings from "./Settings";
import Pokemon from "../pages/Pokemon";
import Favorites from "../pages/Favorites";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function AppRouter({ isBlackTheme }) {

  const font = fonts()
  const Stack = createNativeStackNavigator();

  const screenSettings = (title) =>{
    return {title: title,
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerStyle: {
      backgroundColor: "orange",
    },}
  }
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PostList"
            component={PostList}
            options={screenSettings('Post List')}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={screenSettings('Search')}
          />
          <Stack.Screen
            name="Pokemon"
            component={Pokemon}
            options={screenSettings('Pokemon')}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={screenSettings('Settings')}
          />
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={screenSettings('Favorites')}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
