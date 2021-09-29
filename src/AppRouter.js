import React, { useState } from "react";
import PostList from "./PostList";
import Settings from "./Settings";
import Pokemon from "../pages/Pokemon";
import Favorites from "../pages/Favorites";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function AppRouter({ isBlackTheme }) {
  const Stack = createNativeStackNavigator();
  const [isBlacktheme, setIsBlacktheme] = useState(false);

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
          <Stack.Screen
            name="PostList"
            options={screenSettings("Pokemons")}
          >{(props) => <PostList {...props} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen
            name="Pokemon"
            options={screenSettings("Pokemon")}
          >{(props) => <Pokemon {...props} isBlacktheme={isBlacktheme} />}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={screenSettings("Settings")}>
            {() => (
              <Settings
                isBlacktheme={isBlacktheme}
                setIsBlacktheme={setIsBlacktheme}
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
