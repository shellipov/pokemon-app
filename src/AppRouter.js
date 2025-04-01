import React from "react";
import Settings from "../pages/Settings";
import Favorites from "../pages/Favorites";
import Game from "../pages/Game";
import Pokemon from "../pages/Pokemon";
import PokemonList from "../pages/PokemonList";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Tabs} from "./Tabs";

export default function AppRouter() {
    const Stack = createNativeStackNavigator();

    const screenSettings = (title) => {
        return {
            title: title,
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerStyle: {
                backgroundColor: "orange",
            },
        };
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="MainPage" options={{ headerShown: false }} component={Tabs}  />
                <Stack.Screen name="Settings" options={{ headerShown: false }} component={Settings} />
                <Stack.Screen name="Pokemon" options={screenSettings("Pokemon")} component={Pokemon} />
                <Stack.Screen name="PokemonList" options={screenSettings("PokemonList")} component={PokemonList} />
                <Stack.Screen name="Favorites" options={screenSettings("Favorites")} component={Favorites} />
                <Stack.Screen name="Game" options={screenSettings("Game")} component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
