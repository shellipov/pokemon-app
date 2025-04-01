import React, {useEffect, useState} from "react";
import {StatusBar,} from "react-native";
import AppRouter from "./src/AppRouter";
import {useFonts} from "expo-font";
import {DebugVars} from "./src/debug";
import {reactotronInit} from "./utils/reactotron";
import * as SplashScreen from "expo-splash-screen/build/index";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {SoundController} from "./utils/sounds";
import {useColorScheme} from "react-native";

export default function App() {
    const colorScheme = useColorScheme();
    const setIOSSettings = SoundController.instance.setIOSSettings

    const [loaded, error] = useFonts({
        Comix: require('./assets/fonts/comixloucyr.ttf'),
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (DebugVars?.enableReactotron) {
            reactotronInit();
        }
        setIOSSettings().then()
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded) {
        return null;
    }

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AppRouter />
      </ThemeProvider>
    );

}

