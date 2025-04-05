import React from 'react';
import {ScreenSettings} from '@/screens/ScreenSettings';
import {ScreenFavorites} from '@/screens/ScreenFavorites';
import {ScreenGame} from '@/screens/ScreenGame';
import {ScreenPokemon} from '@/screens/ScreenPokemon';
import {ScreenPokemonList} from '@/screens/ScreenPokemonList';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './Tabs';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {RootStackParamList, ScreenName} from '@/src/AppPouter.types';

export default function AppRouter () {
  const isAuth = false;

  const screenSettings  = (title: string) => {
    return {
      title: title,
      headerShown: true,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange',
      },
      headerBackTitle: 'Back'
    } as NativeStackNavigationOptions;
  };

  const NOT_AUTH_SCREENS: { [key in ScreenName]?: { screen: React.ComponentType<any>; navigationOptions?: any } } = {
    MainPage: {screen: Tabs},
    Settings: {screen: ScreenSettings},
    Pokemon: {screen: ScreenPokemon, navigationOptions: screenSettings('Pokemon')},
    PokemonList: {screen: ScreenPokemonList, navigationOptions: screenSettings('PokemonList')},
    Favorites: {screen: ScreenFavorites, navigationOptions: screenSettings('Favorites')},
    Game: {screen: ScreenGame},
  };

  const AUTH_SCREENS: { [key in ScreenName]?: { screen: React.ComponentType<any>; navigationOptions?: any } } = {};

  const Stack = createNativeStackNavigator<RootStackParamList>();

  const getId = ({ params }: any) => {
    return params?.key;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'MainPage'} screenOptions={{headerShown: false}}>
        {isAuth && (
          (Object.keys(AUTH_SCREENS) as (keyof typeof AUTH_SCREENS)[]).map((name) => (
            <Stack.Screen
              key={name} name={name} component={AUTH_SCREENS[name]!.screen}
              options={AUTH_SCREENS[name]!.navigationOptions} getId={getId} />
          ))
        )}
        {/* Если нет токена - значит пользователь точно не авторизован, и нет смысла строить все пути */}
        {(Object.keys(NOT_AUTH_SCREENS) as (keyof typeof NOT_AUTH_SCREENS)[]).map((name) => (
          <Stack.Screen
            key={name} name={name} component={NOT_AUTH_SCREENS[name]!.screen}
            options={NOT_AUTH_SCREENS[name]!.navigationOptions} getId={getId} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
