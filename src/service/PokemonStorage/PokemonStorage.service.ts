import AsyncStorage from "@react-native-async-storage/async-storage";
import {IPokemon, IPokemonStorage} from "@/screens/ScreenPokemon";
import {Alert} from "react-native";

export async function setPokemonToStorage (value: IPokemonStorage)  {
    try {
        const id = new Date().toString();
        const jsonData = await AsyncStorage.getItem('favorites');
        const list = jsonData ? JSON.parse(jsonData) : [];
        const soughtPokemon = list.find((i: IPokemon) => i.name === value.name);
        if (!soughtPokemon) {
            list.push({ ...value, id });
            const jsonValue = JSON.stringify(list);
            await AsyncStorage.setItem('favorites', jsonValue);
        } else {
            Alert.alert('this pokemon has already been added to favorites');
        }
    } catch (e) {
        console.log(e);
    }
}
