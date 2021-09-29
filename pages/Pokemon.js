import React, { useEffect, useState, useRef } from "react";
import { mainStyles } from "../styles/styles";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../api/api";

const Pokemon = ({ route, isBlacktheme }) => {
  const [pokemon, setPokemon] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

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
      fadeIn();
    }
    fetchMyAPI();
  }, []);

  if (pokemon) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Animated.View
          style={[
            { opacity: fadeAnim },
            {
              flex: 1,
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 20,
              shadowColor: "gray",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 1,
              shadowRadius: 1,
              elevation: 1,
              borderColor: "black",
              borderWidth: 1,
            },
          ]}
        >
          <Text style={[mainStyles.big, {textAlign: "center"}]}>{route.params.name}</Text>
          <Image
            onLoad={fadeIn}
            style={{
              width: '60%',
              height: '30%',
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
              width: '60%',
              height: '30%',
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
          <Text
            style={mainStyles.comixWhite}
          >{`weight: ${route.params.weight}`}</Text>
          <Text style={mainStyles.comixWhite}>
            {`height: ${route.params.height}`}
          </Text>
          <TouchableOpacity
            onPress={() =>
              setPokemonToStorage({
                name: route.params.name,
                img1: pokemon.front_default,
                img2: pokemon.back_default,
              })
            }
          >
            <View
              style={{
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: 15,
                height: 60,
                width: 60,
                paddingHorizontal: 16,
                marginBottom: 20,
              }}
            >
              <Text style={mainStyles.big}>+</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  } else {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: isBlacktheme ? "rgb(24, 24, 24)" : "white",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 20,
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      </>
    );
  }
};

export default Pokemon;
