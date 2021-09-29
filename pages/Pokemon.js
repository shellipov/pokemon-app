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
          backgroundColor: 'gray',
          margin: 20,
          borderRadius: 20,
        }}
      >
        <Text style={mainStyles.big}>{route.params.name}</Text>
        <Image
          style={{
            width: "60%",
            height: "30%",
            shadowColor: "rgb(41, 41, 41)",
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 2,
                shadowRadius: 2,
          }}
          source={{
            uri: route.params.front,
          }}
        />
        <Image
          style={{
            width: "60%",
            height: "30%",
            shadowColor: "rgb(41, 41, 41)",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
          }}
          source={{
            uri: route.params.back,
          }}
        />
        <Text style={mainStyles.comix}>{`weight - ${route.params.weight}`}</Text>
        <Text style={mainStyles.comix} > {`height - ${route.params.height}`}</Text>
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
