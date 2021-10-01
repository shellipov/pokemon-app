import React, { useState, useEffect } from "react";
import PostList from "../pages/PostList";
import Settings from "../pages/Settings";
import Pokemon from "../pages/Pokemon";
import Favorites from "../pages/Favorites";
import Game from "../pages/Game";
import MainPage from "../pages/MainPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppRouter({posts, pages}) {
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
          <Stack.Screen name="MainPage" options={screenSettings("MainPage")}>
            {(props) => <MainPage {...props} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen name="Pokemons" options={screenSettings("Pokemons")}>
            {(props) => <PostList {...props} posts={posts} pages={pages} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen name="Game" options={screenSettings("Game")}>
            {(props) => <Game {...props} posts={posts} isBlacktheme={isBlacktheme} />}
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
