import React, { useEffect, useState } from "react";
import { mainStyles } from "../styles/styles";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../api/api";

const Pokemon = ({ route }) => {
  const [pokemon, setPokemon] = useState(null);

  const setPokemonToStorage = async (value) => {
    try {
      const id = new Date().toString();
      const jsonData = await AsyncStorage.getItem("favorites");
      const list = jsonData ? JSON.parse(jsonData) : [];
      const soughtPokemon = list.find((pokemon) => pokemon.name === value.name);
      if (!soughtPokemon) {
        list.push({ ...value, id });
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem("favorites", jsonValue);
      } else {
        Alert.alert("this pokemon has already been added to favorites");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.getURL(route.params.url);
      setPokemon(data.sprites);
      // await AsyncStorage.setItem("favorites", JSON.stringify([]));
    }
    fetchMyAPI();
  }, []);

  if (pokemon) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={mainStyles.big}>{route.params.name}</Text>
        <Image
          style={{
            width: "60%",
            height: "30%",
          }}
          source={{
            uri: pokemon.front_default,
          }}
        />
        <Image
          style={{
            width: "60%",
            height: "30%",
          }}
          source={{
            uri: pokemon.back_default,
          }}
        />
        <TouchableOpacity
          onPress={() =>
            setPokemonToStorage({
              name: route.params.name,
              img1: pokemon.front_default,
              img2: pokemon.back_default,
            })
          }
        >
          <Text style={mainStyles.big}>+</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="small" />
      </>
    );
  }
};

export default Pokemon;
