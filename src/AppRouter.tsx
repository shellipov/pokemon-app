import React from 'react';
import {ScreenSettings} from '@/screens/ScreenSettings';
import Favorites from '../screens/Favorites';
import Game from '../screens/Game';
import Pokemon from '../screens/Pokemon';
import PokemonList from '../screens/PokemonList';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './Tabs';
import {createStackNavigator} from '@react-navigation/native/src/__stubs__/createStackNavigator';

export enum Routes {
    MainPage = 'MainPage',
    Settings = 'Settings',
    Pokemon = 'Pokemon',
    PokemonList = 'PokemonList',
    Favorites = 'Favorites',
    Game = 'Game',
}

export type RootStackParamList = {
    [Routes.MainPage]: undefined;
    [Routes.Settings]: undefined;
    [Routes.Pokemon]: {item: {}};
    [Routes.PokemonList]: undefined;
    [Routes.Favorites]: undefined;
    [Routes.Game]: undefined;
};

export default function AppRouter() {
  const screenSettings = (title: string) => {
    return {
      title: title,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange',
      },
    };
  };

  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.MainPage} options={{ headerShown: false }} component={Tabs}  />
        <Stack.Screen name={Routes.Settings} options={{ headerShown: false }} component={ScreenSettings} />
        <Stack.Screen name={Routes.Pokemon} options={screenSettings('Pokemon')} component={Pokemon} />
        <Stack.Screen name={Routes.PokemonList} options={screenSettings('PokemonList')} component={PokemonList} />
        <Stack.Screen name={Routes.Favorites} options={screenSettings('Favorites')} component={Favorites} />
        <Stack.Screen name={Routes.Game} options={screenSettings('Game')} component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
