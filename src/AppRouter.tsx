import React from 'react';
import {ScreenSettings} from '@/screens/ScreenSettings';
import Favorites from '../screens/Favorites';
import Game from '../screens/ScreenGame/Game';
import Pokemon from '../screens/Pokemon';
import PokemonList from '../screens/PokemonList';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './Tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

export default function AppRouter () {
  const screenSettings = (title: string) => {
    return {
      title: title,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange',
      },
    };
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.MainPage} >
        <Stack.Screen name={Routes.MainPage} options={{ headerShown: false }}  component={Tabs} />
        <Stack.Screen name={Routes.Settings} options={{ headerShown: false }} component={ScreenSettings} />
        <Stack.Screen name={Routes.Pokemon} options={screenSettings('Pokemon')} component={Pokemon} />
        <Stack.Screen name={Routes.PokemonList} options={screenSettings('Pokemons')} component={PokemonList} />
        <Stack.Screen name={Routes.Favorites} options={screenSettings('Favorites')} component={Favorites} />
        <Stack.Screen name={Routes.Game} options={{ headerShown: false }} component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
