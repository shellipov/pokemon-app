import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import Settings from "./Settings";
import Pokemon from "../pages/Pokemon";
import Favorites from "../pages/Favorites";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppRouter() {
  const Stack = createNativeStackNavigator();
  const [isBlacktheme, setIsBlacktheme] = useState(false);

  const setIsBlackThemeStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("getIsBlackTheme", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getIsBlackThemeStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("getIsBlackTheme");
      return jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    async function getStorageData() {
      const blackTheme = await getIsBlackThemeStorage();
      console.log(blackTheme);
      setIsBlacktheme(blackTheme);
    }
    getStorageData();
  }, []);

  function changetheme(value) {
    setIsBlacktheme(value);
    setIsBlackThemeStorage(value);
  }

  const screenSettings = (title) => {
    return {
      title: title,
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerStyle: {
        backgroundColor: isBlacktheme ? "black" : "orange",
      },
    };
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PostList" options={screenSettings("Pokemons")}>
            {(props) => <PostList {...props} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen name="Pokemon" options={screenSettings("Pokemon")}>
            {(props) => <Pokemon {...props} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={screenSettings("Settings")}>
            {() => (
              <Settings
                isBlacktheme={isBlacktheme}
                setIsBlacktheme={changetheme}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorites" options={screenSettings("Favorites")}>
            {() => <Favorites isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
