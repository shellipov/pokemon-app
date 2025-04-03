import React, {useEffect} from 'react';
import {useColorScheme,} from 'react-native';
import AppRouter from './src/AppRouter';
import {useFonts} from 'expo-font';
import {DebugVars} from './src/debug';
import {reactotronInit} from './utils/reactotron';
import * as SplashScreen from 'expo-splash-screen/build/index';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {SoundController} from './utils/sounds';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App () {
  const colorScheme = useColorScheme();
  const setIOSSettings = SoundController.instance.setIOSSettings;

  const [loaded, error] = useFonts({
    // eslint-disable-next-line no-undef
    Comix: require('./assets/fonts/comixloucyr.ttf'),
    // eslint-disable-next-line no-undef
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (DebugVars?.enableReactotron) {
      reactotronInit();
    }
    setIOSSettings().then();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppRouter />
      </ThemeProvider>
    </SafeAreaProvider>

  );

}

