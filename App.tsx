import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AppRouter from './src/AppRouter';
import { useFonts } from 'expo-font';
import { DebugVars } from './src/debug';
import { reactotronInit } from './utils/reactotron';
import * as SplashScreen from 'expo-splash-screen/build/index';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SoundController } from './utils/sounds';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InversifyProvider } from '@/boot/IoC/provider';

export default function App () {
  const colorScheme = useColorScheme();
  const setIOSSettings = SoundController.instance.setIOSSettings;

  const [loaded, error] = useFonts({
    Comix: require('./assets/fonts/comixloucyr.ttf'),
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (DebugVars?.enableReactotron) {
      reactotronInit();
    }
  }, []);

  useEffect(() => {
    setIOSSettings().then();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <InversifyProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider style={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
          <AppRouter />
        </SafeAreaProvider>
      </ThemeProvider>
    </InversifyProvider>


  );
}
