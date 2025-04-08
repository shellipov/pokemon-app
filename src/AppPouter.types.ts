import {IPokemonItem} from '@/api/api';

export enum Routes {
    MainPage = 'MainPage',
    Settings = 'Settings',
    Pokemon = 'Pokemon',
    PokemonList = 'PokemonList',
    Favorites = 'Favorites',
    Game = 'Game',
}

export type RootStackParamList = {
    MainPage: undefined;
    Settings: undefined;
    Pokemon: {item: IPokemonItem};
    PokemonList: undefined;
    Favorites: undefined;
    Game: undefined;
};


export type ScreenName =
    keyof typeof Routes
