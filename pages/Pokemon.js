import React, { useEffect, useState } from "react";
import { mainStyles } from "../styles/styles";
import { View, Text, Image, ActivityIndicator } from "react-native";
import Api from "../api/api";

const Pokemon = ({ route }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchMyAPI() {
      let data = await Api.getURL(route.params.url);
      setPokemon(data.sprites);
    }
    fetchMyAPI();
  }, []);

  if (pokemon) {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={mainStyles.big}>{route.params.name}</Text>
        <Image
          style={{
            width: "60%",
            height: "40%",
          }}
          source={{
            uri: pokemon.front_default,
          }}
        />
        <Image
          style={{
            width: "60%",
            height: "40%",
          }}
          source={{
            uri: pokemon.back_default,
          }}
        />
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
