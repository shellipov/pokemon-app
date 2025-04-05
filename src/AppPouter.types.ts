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
    [Routes.MainPage]: undefined;
    [Routes.Settings]: undefined;
    [Routes.Pokemon]: {item: IPokemonItem};
    [Routes.PokemonList]: undefined;
    [Routes.Favorites]: undefined;
    [Routes.Game]: undefined;
};
