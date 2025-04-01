import React from "react";
import {ScreenSettings} from "../screens/ScreenSettings";
import Favorites from "../screens/Favorites";
import Game from "../screens/Game";
import Pokemon from "../screens/Pokemon";
import PokemonList from "../screens/PokemonList";
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
                <Stack.Screen name="Settings" options={{ headerShown: false }} component={ScreenSettings} />
                <Stack.Screen name="Pokemon" options={screenSettings("Pokemon")} component={Pokemon} />
                <Stack.Screen name="PokemonList" options={screenSettings("PokemonList")} component={PokemonList} />
                <Stack.Screen name="Favorites" options={screenSettings("Favorites")} component={Favorites} />
                <Stack.Screen name="Game" options={screenSettings("Game")} component={Game} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
