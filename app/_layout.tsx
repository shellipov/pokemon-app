import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Button} from "react-native";
import {SoundController} from "@/utils/sounds";
import {DebugVars} from "@/src/debug";
import {reactotronInit} from "@/utils/reactotron";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const setIOSSettings = SoundController.instance.setIOSSettings

  const [loaded, error] = useFonts({
    Comix: require('../assets/fonts/comixloucyr.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      {/*<DebugPanel debugButtons />*/}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen
            name="pokemon"
            options={{
          title: 'Покемон',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: "Comix",
          },
              headerRight: () => <Button title="Действие" />,
              headerLeft: () => <Button title="Назад" onPress={router.back} />,
        }}
         />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
